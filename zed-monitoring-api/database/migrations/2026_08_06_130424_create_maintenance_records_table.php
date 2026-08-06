<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {

        Schema::create('maintenance_records', function (Blueprint $table) {


            $table->id();


            $table->foreignId('asset_id')
                  ->constrained()
                  ->cascadeOnDelete();


            $table->string('task');


            $table->string('technician');


            $table->date('maintenance_date');


            $table->string('status');


            $table->text('notes')
                  ->nullable();


            $table->timestamps();


        });

    }




    public function down(): void
    {

        Schema::dropIfExists('maintenance_records');

    }

};
