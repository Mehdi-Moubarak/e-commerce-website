<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'email'      => 'required|string|email|unique:users,email',
            'password'   => 'required|string|min:8|confirmed',
            'phone'      => 'nullable|string|max:20',
            'address'    => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'first_name' => $fields['first_name'],
            'last_name'  => $fields['last_name'],
            'email'      => $fields['email'],
            'password'   => bcrypt($fields['password']),
            'phone'      => $fields['phone'] ?? null,
            'address'    => $fields['address'] ?? null,
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials.'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out successfully.'
        ], 200);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $fields = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'email'      => 'required|string|email|unique:users,email,' . $user->id,
            'phone'      => 'nullable|string|max:20',
            'address'    => 'nullable|string|max:255',
            'password'   => 'nullable|string|min:8|confirmed',
        ]);

        $user->first_name = $fields['first_name'];
        $user->last_name  = $fields['last_name'];
        $user->email      = $fields['email'];
        $user->phone      = $fields['phone'] ?? $user->phone;
        $user->address    = $fields['address'] ?? $user->address;

        if (!empty($fields['password'])) {
            $user->password = bcrypt($fields['password']);
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user'    => $user,
        ], 200);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);

        $token = \Illuminate\Support\Str::random(60);

        \DB::table('password_resets')->updateOrInsert(
            ['email' => $request->email],
            ['email' => $request->email, 'token' => bcrypt($token), 'created_at' => now()]
        );

        // In production: send email with reset link containing $token
        // For development: token returned in response
        return response()->json([
            'message' => 'Password reset link sent to your email.',
            'dev_token' => $token, // Remove in production
        ], 200);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email'                 => 'required|email',
            'token'                 => 'required|string',
            'password'              => 'required|string|min:8|confirmed',
        ]);

        $record = \DB::table('password_resets')
            ->where('email', $request->email)
            ->first();

        if (!$record || !\Hash::check($request->token, $record->token)) {
            return response()->json(['message' => 'Invalid or expired reset token.'], 422);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        $user->password = bcrypt($request->password);
        $user->save();

        \DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password reset successfully.'], 200);
    }
}
