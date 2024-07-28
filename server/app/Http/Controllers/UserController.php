<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index()
    {
       // All User
       $users = User::all();
      
       // Return Json Response
       return response()->json([
          'user' => $users
       ],200);
    }
  
    public function store(UserStoreRequest $request)
    {
        try {
            // Create User
            User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => $request->password,
                'phone' => $request->phone,
                'address' => $request->address
            ]);
      
            // Return Json Response
            return response()->json([
                'message' => "User successfully created."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }
  
    public function show($id)
    {
       // User Detail 
       $user = User::find($id);
       if(!$user){
         return response()->json([
            'message'=>'User Not Found.'
         ],404);
       }
      
       // Return Json Response
       return response()->json([
          'user' => $user
       ],200);
    }
  
    public function update(UserStoreRequest $request, $id)
    {
        try {
            // Find User
            $user = User::find($id);
            if(!$user){
              return response()->json([
                'message'=>'User Not Found.'
              ],404);
            }
      
        
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->password = $request->password;
            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->role = $request->role;
      
            // Update User
            $user->save();
      
            // Return Json Response
            return response()->json([
                'message' => "User successfully updated."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }
  
    public function destroy($id)
    {
        // Detail 
        $user = User::find($id);
        if(!$user){
          return response()->json([
             'message'=>'User Not Found.'
          ],404);
        }

        // Delete User
        $user->delete();
      
        // Return Json Response
        return response()->json([
            'message' => "User successfully deleted."
        ],200);
    }
}