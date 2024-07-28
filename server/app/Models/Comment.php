<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table= 'comments';
    protected $fillable = [
        'label', 
        'user',
        'product'
    ];

    protected $with = ['user', 'product'];
    public function user()
    {
        return $this->belongsTo(User::class, 'user', 'id' );
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product', 'id' );
    }
    
}
