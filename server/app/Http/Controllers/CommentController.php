<?php

namespace App\Http\Controllers;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Requests\CommentStoreRequest;

class CommentController extends Controller
{
    public function index()
    {
       // All Comment
       $comments = Comment::all();
      
       // Return Json Response  
       return response()->json([
          'comments' => $comments
       ],200);
    }

    

    
    public function store(CommentStoreRequest $request)
    {
        try {
           
            // Create Comment
            Comment::create([
                'label' => $request->label,
                'user' => $request->user,
                'product' => $request->product
            ]);
      
            // Return Json Response
            return response()->json([
                'message' => "Comment successfully created."
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
         // Comment Detail 
        $comment = Comment::find($id);
        if(!$comment){
            return response()->json([
                'message'=>'Discount Not Found.'
            ],404);
       }
      
       // Return Json Response
       return response()->json([
          'comment' => $comment
       ],200);
    }

    public function update(CommentStoreRequest $request, $id)
    {
        try {
            // Find Comment
            $comment = Comment::find($id);
            if(!$comment){
              return response()->json([
                'message'=>'Comment Not Found.'
              ],404);
            }
      
            //echo "request : $request->image";
            $comment->label = $request->label;
            $comment->user = $request->user;
            $comment->product = $request->product;
            
      
            // Update Comment
            $comment->save();
      
            // Return Json Response
            return response()->json([
                'message' => "Comment successfully updated."
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
          $comment = Comment::find($id);
          if(!$comment){
            return response()->json([
               'message'=>'Comment Not Found.'
            ],404);
        }
        
          // Delete Comment
          $comment->delete();
        
          // Return Json Response
          return response()->json([
              'message' => "Comment successfully deleted."
          ],200);
    }
}
