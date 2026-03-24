<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    public function definition()
    {
        return [
            'image'       => Str::random(32).'.jpg',
            'name'        => fake()->words(3, true),
            'description' => fake()->sentence(),
            'stock'       => fake()->numberBetween(0, 100),
            'price'       => fake()->randomFloat(2, 5, 500),
            'evaluation'  => fake()->numberBetween(1, 5),
            'category'    => fake()->randomElement(['electronics', 'clothing', 'books', 'home']),
        ];
    }
}
