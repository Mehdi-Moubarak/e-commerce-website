<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Requests\CategoryStoreRequest;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::paginate(50);

        return response()->json([
            'categories' => $categories
        ], 200);
    }

    public function store(CategoryStoreRequest $request)
    {
        try {
            $category = Category::create([
                'nameCategory' => $request->nameCategory,
                'description'  => $request->description
            ]);

            return response()->json([
                'message'  => "Category successfully created.",
                'category' => $category,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Failed to create category.",
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'Category not found.'
            ], 404);
        }

        return response()->json([
            'category' => $category
        ], 200);
    }

    public function update(CategoryStoreRequest $request, $id)
    {
        try {
            $category = Category::find($id);

            if (!$category) {
                return response()->json([
                    'message' => 'Category not found.'
                ], 404);
            }

            $category->nameCategory = $request->nameCategory;
            $category->description  = $request->description;
            $category->save();

            return response()->json([
                'message' => "Category successfully updated."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Failed to update category.",
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'Category not found.'
            ], 404);
        }

        $category->delete();

        return response()->json([
            'message' => "Category successfully deleted."
        ], 200);
    }
}
