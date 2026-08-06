<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{

    protected $fillable = [

        'name',

        'type',

        'location',

        'status',

        'serial_number',

        'purchase_date',

        'last_service',

        'warranty',

    ];

    public function maintenanceRecords()
{

    return $this->hasMany(
        MaintenanceRecord::class
    );

}

public function incidents()
{
    return $this->hasMany(
        Incident::class
    );
}
}
