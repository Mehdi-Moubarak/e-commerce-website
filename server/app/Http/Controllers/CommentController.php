<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Requests\CommentStoreRequest;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::paginate(15);

        return response()->json([
            'comments' => $comments
        ], 200);
    }

    public function store(CommentStoreRequest $request)
    {
        try {
            $comment = Comment::create([
                'label'   => $request->label,
                'user'    => $request->user,
                'product' => $request->product,
            ]);

            return response()->json([
                'message' => "Comment successfully created.",
                'comment' => $comment,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Failed to create comment.",
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                'message' => 'Comment not found.'
            ], 404);
        }

        return response()->json([
            'comment' => $comment
        ], 200);
    }

    public function update(CommentStoreRequest $request, $id)
    {
        try {
            $comment = Comment::find($id);

            if (!$comment) {
                return response()->json([
                    'message' => 'Comment not found.'
                ], 404);
            }

            $comment->label   = $request->label;
            $comment->user    = $request->user;
            $comment->product = $request->product;
            $comment->save();

            return response()->json([
                'message' => "Comment successfully updated."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Failed to update comment.",
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                'message' => 'Comment not found.'
            ], 404);
        }

        $comment->delete();

        return response()->json([
            'message' => "Comment successfully deleted."
        ], 200);
    }
}
