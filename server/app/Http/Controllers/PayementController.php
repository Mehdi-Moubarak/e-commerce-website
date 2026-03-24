<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payement;

class PayementController extends Controller
{
    public function index()
    {
        $payements = Payement::paginate(15);

        return response()->json([
            'payements' => $payements
        ], 200);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'label' => 'required|string|max:255',
        ]);

        try {
            $payement = Payement::create([
                'label' => $fields['label'],
            ]);

            return response()->json([
                'message'  => 'Payment method successfully created.',
                'payement' => $payement,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create payment method.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $payement = Payement::find($id);

        if (!$payement) {
            return response()->json([
                'message' => 'Payment method not found.'
            ], 404);
        }

        return response()->json([
            'payement' => $payement
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $payement = Payement::find($id);

        if (!$payement) {
            return response()->json([
                'message' => 'Payment method not found.'
            ], 404);
        }

        $fields = $request->validate([
            'label' => 'required|string|max:255',
        ]);

        try {
            $payement->label = $fields['label'];
            $payement->save();

            return response()->json([
                'message'  => 'Payment method successfully updated.',
                'payement' => $payement,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update payment method.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $payement = Payement::find($id);

        if (!$payement) {
            return response()->json([
                'message' => 'Payment method not found.'
            ], 404);
        }

        $payement->delete();

        return response()->json([
            'message' => 'Payment method successfully deleted.'
        ], 200);
    }
}
