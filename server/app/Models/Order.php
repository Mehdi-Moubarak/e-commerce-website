<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'total_price',
        'status',
        'payment_status',
        'customer_id',
        'panier_id',
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
}
