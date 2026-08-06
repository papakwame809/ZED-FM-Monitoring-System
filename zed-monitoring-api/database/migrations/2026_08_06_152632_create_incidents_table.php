<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('incidents', function (Blueprint $table) {


            $table->id();



            $table->foreignId('asset_id')
                ->constrained()
                ->cascadeOnDelete();



            $table->string('title');



            $table->text('description')
                ->nullable();



            $table->string('severity')
                ->default('Low');



            $table->string('status')
                ->default('Open');



            $table->date('incident_date');



            $table->timestamps();



            $table->index('status');

            $table->index('incident_date');


        });

    }




    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::dropIfExists('incidents');

    }

};
