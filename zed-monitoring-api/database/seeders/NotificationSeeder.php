<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notification;


class NotificationSeeder extends Seeder
{

    public function run(): void
    {

        Notification::create([

            'title' => 'Critical Incident Reported',

            'message' => 'FM Transmitter has a signal fault.',

            'read' => false,

        ]);



        Notification::create([

            'title' => 'Maintenance Scheduled',

            'message' => 'Studio Console maintenance is scheduled for 20 August 2026.',

            'read' => false,

        ]);



        Notification::create([

            'title' => 'Asset Fault',

            'message' => 'Generator status changed to Faulty.',

            'read' => false,

        ]);

    }

}
