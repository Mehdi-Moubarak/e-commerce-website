<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPanier extends Model
{
    use HasFactory;
    protected $fillable = [
        'panier_id', 
        'Product',
        'quantity'
    ];
}
