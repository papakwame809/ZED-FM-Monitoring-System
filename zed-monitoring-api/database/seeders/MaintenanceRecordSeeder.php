<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MaintenanceRecord;


class MaintenanceRecordSeeder extends Seeder
{

    public function run(): void
    {

        $records = [

            [
                'asset_id' => 1,
                'task' => 'Inspect FM transmitter power output',
                'technician' => 'Kwame',
                'maintenance_date' => '2026-08-15',
                'status' => 'Scheduled',
                'notes' => 'Check signal strength, cooling system, and connections.',
            ],


            [
                'asset_id' => 2,
                'task' => 'Studio console servicing',
                'technician' => 'Ama',
                'maintenance_date' => '2026-08-20',
                'status' => 'Pending',
                'notes' => 'Replace faulty audio channels and test outputs.',
            ],


            [
                'asset_id' => 3,
                'task' => 'Generator inspection',
                'technician' => 'Sara',
                'maintenance_date' => '2026-08-25',
                'status' => 'Scheduled',
                'notes' => 'Inspect fuel system, battery, and voltage output.',
            ],

        ];



        foreach ($records as $record) {

            MaintenanceRecord::create($record);

        }

    }

}
