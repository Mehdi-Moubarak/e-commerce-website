<?php

namespace App\Http\Controllers;
use App\Http\Requests\DiscountStoreRequest;
use Illuminate\Http\Request;
use App\Models\Discount;
use Illuminate\Support\Str;

class DiscountController extends Controller
{
    
    public function index()
    {
       // All Discount
       $discounts = Discount::all();
      
       // Return Json Response
       return response()->json([
          'discounts' => $discounts
       ],200);
    }

    
    public function create()
    {
        //
    }

    
    public function store(DiscountStoreRequest $request)
    {
        try {
           
            // Create Discount
            Discount::create([
                'label' => $request->label,
                'value' => $request->value
            ]);
      
            
            // Return Json Response
            return response()->json([
                'message' => "Discount successfully created."
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
        // Discount Detail 
       $discount = Discount::find($id);
       if(!$discount){
         return response()->json([
            'message'=>'Discount Not Found.'
         ],404);
       }
      
       // Return Json Response
       return response()->json([
          'discount' => $discount
       ],200);
    }

    
    public function edit($id)
    {
        //
    }

    
    public function update(DiscountStoreRequest $request, $id)
    {
        try {
            // Find Discount
            $discount = Discount::find($id);
            if(!$discount){
              return response()->json([
                'message'=>'Discount Not Found.'
              ],404);
            }
      
        
            $discount->label = $request->label;
            $discount->value = $request->value;
      
            // Update Discount
            $discount->save();
      
            // Return Json Response
            return response()->json([
                'message' => "Discount successfully updated."
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
        $discount = Discount::find($id);
        if(!$discount){
          return response()->json([
             'message'=>'Discount Not Found.'
          ],404);
        }
      
        // Delete Discount
        $discount->delete();
      
        // Return Json Response
        return response()->json([
            'message' => "Discount successfully deleted."
        ],200);
    }
}
