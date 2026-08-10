<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Default System Administrator
        User::updateOrCreate(
            ['email' => 'admin@zedfm.com'],
            [
                'name' => 'System Admin',
                'password' => Hash::make('AdminPass123!'),
                'role' => 'admin',
                'status' => 'active',
            ]
        );

        // Default Field Technician
        User::updateOrCreate(
            ['email' => 'tech@zedfm.com'],
            [
                'name' => 'Lead Technician',
                'password' => Hash::make('TechPass123!'),
                'role' => 'technician',
                'status' => 'active',
            ]
        );
    }
}
