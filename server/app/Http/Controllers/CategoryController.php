<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Requests\CategoryStoreRequest;
use Illuminate\Support\Str;


class CategoryController extends Controller
{
    public function index()
    {
       // All Category
       $categories = Category::all();
      
       // Return Json Response
       return response()->json([
          'categories' => $categories
       ],200);
    }

   

    public function store(CategoryStoreRequest $request)
    {
        try {
           
            // Create Category
            Category::create([
                'nameCategory' => $request->nameCategory,
                'description' => $request->description
            ]);
      
            
            // Return Json Response
            return response()->json([
                'message' => "Category successfully created."
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
       // Category Detail 
       $category = Category::find($id);
       if(!$category){
         return response()->json([
            'message'=>'Category Not Found.'
         ],404);
       }
      
       // Return Json Response
       return response()->json([
          'category' => $category
       ],200);
    }

    
    public function update(CategoryStoreRequest $request, $id)
    {
        try {
            // Find Category
            $category = Category::find($id);
            if(!$category){
              return response()->json([
                'message'=>'Category Not Found.'
              ],404);
            }
      
        
            $category->nameCategory = $request->nameCategory;
            $category->description = $request->description;
      
            // Update Category
            $category->save();
      
            // Return Json Response
            return response()->json([
                'message' => "Category successfully updated."
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
        $category = Category::find($id);
        if(!$category){
          return response()->json([
             'message'=>'Category Not Found.'
          ],404);
        }
      
        // Delete Category
        $category->delete();
      
        // Return Json Response
        return response()->json([
            'message' => "Category successfully deleted."
        ],200);
    }
}
