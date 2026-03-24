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
}
