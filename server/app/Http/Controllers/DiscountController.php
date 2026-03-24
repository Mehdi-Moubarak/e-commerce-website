<?php

namespace App\Http\Controllers;

use App\Http\Requests\DiscountStoreRequest;
use Illuminate\Http\Request;
use App\Models\Discount;

class DiscountController extends Controller
{
    public function index()
    {
        $discounts = Discount::paginate(15);

        return response()->json([
            'discounts' => $discounts
        ], 200);
    }

    public function store(DiscountStoreRequest $request)
    {
        try {
            $discount = Discount::create([
                'label' => $request->label,
                'value' => $request->value
            ]);

            return response()->json([
                'message'  => "Discount successfully created.",
                'discount' => $discount,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Failed to create discount.",
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $discount = Discount::find($id);

        if (!$discount) {
            return response()->json([
                'message' => 'Discount not found.'
            ], 404);
        }

        return response()->json([
            'discount' => $discount
        ], 200);
    }

    public function update(DiscountStoreRequest $request, $id)
    {
        try {
            $discount = Discount::find($id);

            if (!$discount) {
                return response()->json([
                    'message' => 'Discount not found.'
                ], 404);
            }

            $discount->label = $request->label;
            $discount->value = $request->value;
            $discount->save();

            return response()->json([
                'message' => "Discount successfully updated."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Failed to update discount.",
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $discount = Discount::find($id);

        if (!$discount) {
            return response()->json([
                'message' => 'Discount not found.'
            ], 404);
        }

        $discount->delete();

        return response()->json([
            'message' => "Discount successfully deleted."
        ], 200);
    }
}
