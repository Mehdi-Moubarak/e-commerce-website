<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(15);

        return response()->json([
            'user' => $users
        ], 200);
    }

    public function store(UserStoreRequest $request)
    {
        try {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name'  => $request->last_name,
                'email'      => $request->email,
                'password'   => Hash::make($request->password),
                'phone'      => $request->phone,
                'address'    => $request->address,
                'role'       => $request->role ?? 'customer',
            ]);

            return response()->json([
                'message' => "User successfully created.",
                'user'    => $user,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Failed to create user.",
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found.'
            ], 404);
        }

        return response()->json([
            'user' => $user
        ], 200);
    }

    public function update(UserStoreRequest $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'message' => 'User not found.'
                ], 404);
            }

            $user->first_name = $request->first_name;
            $user->last_name  = $request->last_name;
            $user->email      = $request->email;
            $user->phone      = $request->phone;
            $user->address    = $request->address;
            $user->role       = $request->role ?? $user->role;

            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
            }

            $user->save();

            return response()->json([
                'message' => "User successfully updated."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Failed to update user.",
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found.'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => "User successfully deleted."
        ], 200);
    }
}
