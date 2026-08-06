<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MaintenanceRecord;


class MaintenanceRecordSeeder extends Seeder
{

    public function run(): void
    {

        MaintenanceRecord::create([

            'asset_id' => 1,

            'task' => 'Replaced transmitter cooling fan',

            'technician' => 'Kwame Mensah',

            'maintenance_date' => '2026-07-10',

            'status' => 'Completed',

            'notes' => 'Cooling system restored successfully.',

        ]);





        MaintenanceRecord::create([

            'asset_id' => 2,

            'task' => 'Studio console inspection and calibration',

            'technician' => 'Ama Boateng',

            'maintenance_date' => '2026-07-15',

            'status' => 'Completed',

            'notes' => 'Audio channels tested and calibrated.',

        ]);





        MaintenanceRecord::create([

            'asset_id' => 3,

            'task' => 'Generator diagnostic check',

            'technician' => 'Kofi Asare',

            'maintenance_date' => '2026-07-20',

            'status' => 'Pending',

            'notes' => 'Awaiting replacement parts.',

        ]);

    }

}
