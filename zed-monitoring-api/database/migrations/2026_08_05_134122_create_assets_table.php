<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Create assets table.
     */
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {

            $table->id();

            // Basic asset information
            $table->string('name');

            $table->string('type');

            $table->string('location');

            // Operational status
            // Examples:
            // Operational
            // Maintenance Due
            // Faulty
            $table->string('status');


            // Unique equipment identifier
            $table->string('serial_number')
                  ->unique();


            // Purchase information
            $table->date('purchase_date')
                  ->nullable();


            // Latest maintenance date
            $table->date('last_service')
                  ->nullable();


            // Warranty expiry
            $table->string('warranty')
                  ->nullable();


            // Laravel automatically manages these
            // created_at and updated_at
            $table->timestamps();

        });
    }



    /**
     * Remove assets table.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }

};
