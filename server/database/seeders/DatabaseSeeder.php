<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Discount;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // ── Users ──────────────────────────────────────────────
        if (!User::where('email', 'admin@example.com')->exists()) {
            User::create([
                'first_name' => 'Admin',
                'last_name'  => 'User',
                'email'      => 'admin@example.com',
                'password'   => Hash::make('password'),
                'role'       => 'admin',
                'phone'      => '0600000000',
                'address'    => '1 Admin Street, Paris',
            ]);
        }

        if (!User::where('email', 'john@example.com')->exists()) {
            User::create([
                'first_name' => 'John',
                'last_name'  => 'Doe',
                'email'      => 'john@example.com',
                'password'   => Hash::make('password'),
                'role'       => 'customer',
                'phone'      => '0611111111',
                'address'    => '42 Customer Avenue, Lyon',
            ]);
        }

        // ── Categories ─────────────────────────────────────────
        $sofas    = Category::firstOrCreate(['nameCategory' => 'Sofas'],    ['description' => 'Comfortable sofas and sectionals for every living room.']);
        $chairs   = Category::firstOrCreate(['nameCategory' => 'Chairs'],   ['description' => 'Accent chairs, dining chairs and armchairs.']);
        $tables   = Category::firstOrCreate(['nameCategory' => 'Tables'],   ['description' => 'Dining tables, coffee tables and side tables.']);
        $beds     = Category::firstOrCreate(['nameCategory' => 'Beds'],     ['description' => 'Bed frames, headboards and bedroom sets.']);
        $lighting = Category::firstOrCreate(['nameCategory' => 'Lighting'], ['description' => 'Pendant lights, floor lamps and wall sconces.']);
        $storage  = Category::firstOrCreate(['nameCategory' => 'Storage'],  ['description' => 'Shelves, wardrobes and storage solutions.']);

        // ── Products ───────────────────────────────────────────
        // Images cycle through the 3 available product images
        $imgs = [
            'products/product-1.png',
            'products/product-2.png',
            'products/product-3.png',
        ];

        $products = [
            // Sofas
            ['name' => 'Modern Grey Sofa',      'desc' => 'A plush 3-seater sofa in soft grey fabric with solid oak legs. Perfect centrepiece for any living room.',        'price' => 899.99,  'stock' => 12, 'eval' => 4.5, 'cat' => $sofas->id,    'img' => $imgs[0]],
            ['name' => 'L-Shape Corner Sofa',   'desc' => 'Spacious L-shaped sectional with built-in chaise and hidden storage ottoman. Seats up to 6 comfortably.',       'price' => 1499.99, 'stock' => 6,  'eval' => 4.8, 'cat' => $sofas->id,    'img' => $imgs[1]],
            ['name' => 'Velvet 2-Seater',       'desc' => 'Luxurious emerald-green velvet loveseat with gold-finish legs. A bold statement piece for smaller spaces.',      'price' => 649.99,  'stock' => 9,  'eval' => 4.6, 'cat' => $sofas->id,    'img' => $imgs[2]],
            // Chairs
            ['name' => 'Velvet Armchair',       'desc' => 'Deep-blue velvet accent armchair with button-tufted back and tapered walnut legs. Supremely comfortable.',       'price' => 449.99,  'stock' => 20, 'eval' => 4.7, 'cat' => $chairs->id,   'img' => $imgs[0]],
            ['name' => 'Dining Chair Set of 4', 'desc' => 'Set of four solid beech dining chairs with padded linen seats. Available in natural or charcoal finish.',        'price' => 599.99,  'stock' => 10, 'eval' => 4.3, 'cat' => $chairs->id,   'img' => $imgs[1]],
            ['name' => 'Rattan Accent Chair',   'desc' => 'Handwoven rattan chair with removable cushion. Brings a natural boho touch to any corner of your home.',         'price' => 299.99,  'stock' => 15, 'eval' => 4.4, 'cat' => $chairs->id,   'img' => $imgs[2]],
            // Tables
            ['name' => 'Oak Dining Table',      'desc' => 'Solid oak extending dining table. Seats 6 normally, extends to seat 10 with the butterfly leaf mechanism.',      'price' => 1199.99, 'stock' => 7,  'eval' => 4.8, 'cat' => $tables->id,   'img' => $imgs[0]],
            ['name' => 'Glass Coffee Table',    'desc' => 'Contemporary tempered glass top coffee table with brushed brass frame. Easy to clean and light to move.',        'price' => 349.99,  'stock' => 18, 'eval' => 4.5, 'cat' => $tables->id,   'img' => $imgs[1]],
            ['name' => 'Marble Side Table',     'desc' => 'White Carrara marble top on a matte black steel base. A sophisticated addition to any bedroom or lounge.',       'price' => 249.99,  'stock' => 22, 'eval' => 4.6, 'cat' => $tables->id,   'img' => $imgs[2]],
            // Beds
            ['name' => 'King Platform Bed',     'desc' => 'Minimalist king-size platform bed in solid walnut. Low-profile design with slatted base — no box spring needed.','price' => 799.99,  'stock' => 8,  'eval' => 4.6, 'cat' => $beds->id,     'img' => $imgs[0]],
            ['name' => 'Upholstered Queen Bed', 'desc' => 'Queen bed with a tall upholstered headboard in stone-grey boucle fabric. Includes wooden slat frame.',           'price' => 699.99,  'stock' => 11, 'eval' => 4.7, 'cat' => $beds->id,     'img' => $imgs[1]],
            // Lighting
            ['name' => 'Copper Pendant Light',  'desc' => 'Industrial-style spun copper pendant with braided fabric cord. E27 fitting, bulb not included. Diameter 30cm.',  'price' => 199.99,  'stock' => 30, 'eval' => 4.4, 'cat' => $lighting->id, 'img' => $imgs[2]],
            ['name' => 'Arc Floor Lamp',        'desc' => 'Tall arching floor lamp with a brushed gold finish and a white linen shade. Creates warm ambient lighting.',      'price' => 279.99,  'stock' => 16, 'eval' => 4.5, 'cat' => $lighting->id, 'img' => $imgs[0]],
            // Storage
            ['name' => 'Floating Wall Shelf',   'desc' => 'Set of 3 solid pine floating shelves with invisible brackets. Each shelf holds up to 15 kg. Easy to install.',   'price' => 129.99,  'stock' => 25, 'eval' => 4.3, 'cat' => $storage->id,  'img' => $imgs[1]],
            ['name' => 'Oak Bookcase',          'desc' => '5-shelf solid oak bookcase with adjustable shelves and a sturdy back panel. A timeless piece for any room.',     'price' => 549.99,  'stock' => 9,  'eval' => 4.6, 'cat' => $storage->id,  'img' => $imgs[2]],
        ];

        foreach ($products as $p) {
            if (!Product::where('name', $p['name'])->exists()) {
                Product::create([
                    'name'        => $p['name'],
                    'description' => $p['desc'],
                    'price'       => $p['price'],
                    'stock'       => $p['stock'],
                    'evaluation'  => $p['eval'],
                    'category'    => $p['cat'],
                    'image'       => $p['img'],
                ]);
            }
        }

        // ── Discount codes ─────────────────────────────────────
        if (!Discount::where('label', 'WELCOME10')->exists()) {
            Discount::create(['label' => 'WELCOME10', 'value' => 10]);
        }
        if (!Discount::where('label', 'SAVE20')->exists()) {
            Discount::create(['label' => 'SAVE20', 'value' => 20]);
        }

        $this->command->info('✓ Seeded: 2 users, 6 categories, 15 products, 2 discount codes.');
    }
}
