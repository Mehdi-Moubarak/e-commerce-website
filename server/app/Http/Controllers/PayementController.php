<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payement;

class PayementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         // All Payement
        $payements = Payement::all();
      
       // Return Json Response
       return response()->json([
          'payements' => $payements
       ],200);
    }

   
    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        //
    }

    
    public function show($id)
    {
        //
    }

    
    public function edit($id)
    {
        //
    }

    
    public function update(Request $request, $id)
    {
        //
    }

    
    public function destroy($id)
    {
        //
    }
}
