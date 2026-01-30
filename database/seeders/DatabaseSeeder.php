<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
use App\Models\Portfolio;
use App\Models\AddOn;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@photography.com',
            'password' => Hash::make('admin123456'),
            'role' => 'admin',
        ]);

        // Create Demo Customer
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'customer@example.com',
            'password' => Hash::make('password'),
            'phone' => '(555) 123-4567',
            'role' => 'customer',
        ]);

        // Create Services
        Service::create([
            'name' => 'Portrait Photography',
            'description' => 'Professional portrait photography for individuals, families, and professionals. Perfect for headshots and keepsakes.',
            'base_price' => 150.00,
            'duration_minutes' => 60,
            'category' => 'Portraits',
            'package_details' => 'Includes 1 hour session, 30 edited photos, and digital copies.',
            'max_bookings_per_day' => 5,
            'is_active' => true,
        ]);

        Service::create([
            'name' => 'Wedding Photography',
            'description' => 'Complete wedding day coverage including ceremony, reception, and candid moments.',
            'base_price' => 2000.00,
            'duration_minutes' => 480,
            'category' => 'Weddings',
            'package_details' => 'Full 8-hour coverage, 500+ edited photos, engagement session included.',
            'max_bookings_per_day' => 2,
            'is_active' => true,
        ]);

        Service::create([
            'name' => 'Corporate Event Photography',
            'description' => 'Professional photography for corporate events, conferences, and business functions.',
            'base_price' => 800.00,
            'duration_minutes' => 240,
            'category' => 'Events',
            'package_details' => '4-hour coverage, 200+ edited photos, digital gallery access.',
            'max_bookings_per_day' => 3,
            'is_active' => true,
        ]);

        Service::create([
            'name' => 'Product Photography',
            'description' => 'High-quality product photography for e-commerce and marketing materials.',
            'base_price' => 400.00,
            'duration_minutes' => 120,
            'category' => 'Products',
            'package_details' => 'Up to 20 products, 2 hours session, background options available.',
            'max_bookings_per_day' => 4,
            'is_active' => true,
        ]);

        // Create Add-ons
        AddOn::create([
            'name' => 'Extra Prints (50 copies)',
            'description' => '50 professional quality prints',
            'price' => 75.00,
            'is_active' => true,
        ]);

        AddOn::create([
            'name' => 'Photo Album',
            'description' => 'Premium leather-bound photo album',
            'price' => 120.00,
            'is_active' => true,
        ]);

        AddOn::create([
            'name' => 'Express Editing',
            'description' => '48-hour turnaround for edited photos',
            'price' => 150.00,
            'is_active' => true,
        ]);

        AddOn::create([
            'name' => 'Video Highlights',
            'description' => '3-5 minute video highlight reel',
            'price' => 300.00,
            'is_active' => true,
        ]);

        // Create Portfolio Items
        Portfolio::create([
            'title' => 'Summer Family Portrait',
            'description' => 'Beautiful outdoor family portrait session capturing precious moments together.',
            'image_path' => 'portfolio/default.jpg',
            'category' => 'Portraits',
            'display_order' => 1,
            'is_featured' => true,
        ]);

        Portfolio::create([
            'title' => 'Elegant Wedding Reception',
            'description' => 'Stunning shots from a beautiful wedding celebration with family and friends.',
            'image_path' => 'portfolio/default.jpg',
            'category' => 'Weddings',
            'display_order' => 2,
            'is_featured' => true,
        ]);

        Portfolio::create([
            'title' => 'Corporate Conference',
            'description' => 'Professional event coverage from a major corporate conference.',
            'image_path' => 'portfolio/default.jpg',
            'category' => 'Events',
            'display_order' => 3,
            'is_featured' => true,
        ]);

        Portfolio::create([
            'title' => 'E-commerce Product Line',
            'description' => 'High-quality product photography for online store.',
            'image_path' => 'portfolio/default.jpg',
            'category' => 'Products',
            'display_order' => 4,
            'is_featured' => true,
        ]);
    }
}
