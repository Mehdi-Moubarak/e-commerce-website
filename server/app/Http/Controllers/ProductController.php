<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\ProductStoreRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        $products = $query->paginate(15);

        return response()->json([
            'products' => $products
        ], 200);
    }

    public function store(ProductStoreRequest $request)
    {
        try {
            $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();

            Product::create([
                'image'       => $imageName,
                'name'        => $request->name,
                'description' => $request->description,
                'stock'       => $request->stock,
                'price'       => $request->price,
                'evaluation'  => $request->evaluation,
                'category'    => $request->category
            ]);

            Storage::disk('public')->put($imageName, file_get_contents($request->image));

            return response()->json([
                'message' => "Product successfully created."
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Failed to create product.",
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found.'
            ], 404);
        }

        return response()->json([
            'product' => $product
        ], 200);
    }

    public function update(ProductStoreRequest $request, $id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json([
                    'message' => 'Product not found.'
                ], 404);
            }

            $product->name        = $request->name;
            $product->description = $request->description;
            $product->stock       = $request->stock;
            $product->price       = $request->price;
            $product->evaluation  = $request->evaluation;
            $product->category    = $request->category;

            if ($request->hasFile('image')) {
                $storage = Storage::disk('public');

                if ($storage->exists($product->image)) {
                    $storage->delete($product->image);
                }

                $imageName     = Str::random(32).".".$request->image->getClientOriginalExtension();
                $product->image = $imageName;
                $storage->put($imageName, file_get_contents($request->image));
            }

            $product->save();

            return response()->json([
                'message' => "Product successfully updated."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Failed to update product.",
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found.'
            ], 404);
        }

        $storage = Storage::disk('public');

        if ($storage->exists($product->image)) {
            $storage->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'message' => "Product successfully deleted."
        ], 200);
    }
}
