<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Asset;


class AssetSeeder extends Seeder
{

    public function run(): void
    {

        $assets = [

            [
                'name' => 'FM Transmitter',

                'type' => 'Transmission',

                'location' => 'Tower Room',

                'status' => 'Operational',

                'serial_number' => 'ZED-FM-001',

                'purchase_date' => '2024-01-15',

                'last_service' => '10 Jul 2026',

                'warranty' => 'Dec 2028',
            ],



            [
                'name' => 'Studio Console',

                'type' => 'Audio',

                'location' => 'Studio A',

                'status' => 'Maintenance Due',

                'serial_number' => 'ZED-AUD-013',

                'purchase_date' => '2025-02-02',

                'last_service' => '10 Jul 2026',

                'warranty' => 'Dec 2028',
            ],



            [
                'name' => 'Generator',

                'type' => 'Power',

                'location' => 'Newsroom',

                'status' => 'Faulty',

                'serial_number' => 'GEN-021',

                'purchase_date' => '2022-03-08',

                'last_service' => '10 Jul 2026',

                'warranty' => 'Dec 2028',
            ],

        ];





        foreach ($assets as $asset) {

            Asset::create($asset);

        }

    }

}
