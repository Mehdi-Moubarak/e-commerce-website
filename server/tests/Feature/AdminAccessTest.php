<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_users_list()
    {
        $response = $this->getJson('/api/users');

        $response->assertStatus(401);
    }

    public function test_customer_cannot_access_users_list()
    {
        $customer = User::factory()->create(['role' => 'customer']);

        $response = $this->actingAs($customer, 'sanctum')
                         ->getJson('/api/users');

        $response->assertStatus(403)
                 ->assertJson(['message' => 'Unauthorized. Admin access required.']);
    }

    public function test_admin_can_access_users_list()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin, 'sanctum')
                         ->getJson('/api/users');

        $response->assertStatus(200)
                 ->assertJsonStructure(['user']);
    }

    public function test_customer_cannot_create_category()
    {
        $customer = User::factory()->create(['role' => 'customer']);

        $response = $this->actingAs($customer, 'sanctum')
                         ->postJson('/api/category', [
                             'nameCategory' => 'Electronics',
                             'description'  => 'Electronic items',
                         ]);

        $response->assertStatus(403);
    }

    public function test_guest_cannot_create_discount()
    {
        $response = $this->postJson('/api/discounts', [
            'label' => '10% OFF',
            'value' => 10,
        ]);

        $response->assertStatus(401);
    }
}
