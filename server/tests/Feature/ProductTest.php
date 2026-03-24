<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    private function makeAdmin(): User
    {
        return User::factory()->create(['role' => 'admin']);
    }

    private function makeCustomer(): User
    {
        return User::factory()->create(['role' => 'customer']);
    }

    public function test_anyone_can_list_products()
    {
        Product::factory()->count(3)->create();

        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
                 ->assertJsonStructure(['products' => ['data']]);
    }

    public function test_products_are_paginated()
    {
        Product::factory()->count(20)->create();

        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
                 ->assertJsonPath('products.per_page', 15)
                 ->assertJsonCount(15, 'products.data');
    }

    public function test_products_can_be_searched_by_name()
    {
        Product::factory()->create(['name' => 'Blue Widget']);
        Product::factory()->create(['name' => 'Red Gadget']);

        $response = $this->getJson('/api/products?search=Widget');

        $response->assertStatus(200);
        $data = $response->json('products.data');
        $this->assertCount(1, $data);
        $this->assertEquals('Blue Widget', $data[0]['name']);
    }

    public function test_products_can_be_filtered_by_category()
    {
        Product::factory()->create(['category' => 'electronics']);
        Product::factory()->create(['category' => 'clothing']);

        $response = $this->getJson('/api/products?category=electronics');

        $response->assertStatus(200);
        $data = $response->json('products.data');
        $this->assertCount(1, $data);
        $this->assertEquals('electronics', $data[0]['category']);
    }

    public function test_anyone_can_view_a_single_product()
    {
        $product = Product::factory()->create();

        $response = $this->getJson("/api/products/{$product->id}");

        $response->assertStatus(200)
                 ->assertJsonPath('product.id', $product->id);
    }

    public function test_product_show_returns_404_for_missing_product()
    {
        $response = $this->getJson('/api/products/9999');

        $response->assertStatus(404);
    }

    public function test_guest_cannot_delete_product()
    {
        $product = Product::factory()->create();

        $response = $this->deleteJson("/api/productdelete/{$product->id}");

        $response->assertStatus(401);
    }

    public function test_customer_cannot_delete_product()
    {
        $customer = $this->makeCustomer();
        $product  = Product::factory()->create();

        $response = $this->actingAs($customer, 'sanctum')
                         ->deleteJson("/api/productdelete/{$product->id}");

        $response->assertStatus(403);
    }

    public function test_admin_can_delete_product()
    {
        $admin   = $this->makeAdmin();
        $product = Product::factory()->create();

        // Clean up storage mock — skip image deletion in test
        $response = $this->actingAs($admin, 'sanctum')
                         ->deleteJson("/api/productdelete/{$product->id}");

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Product successfully deleted.']);
    }
}
