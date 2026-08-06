<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class MaintenanceRecord extends Model
{

    protected $fillable = [

        'asset_id',
        'task',
        'technician',
        'maintenance_date',
        'status',
        'notes',

    ];



    public function asset()
    {

        return $this->belongsTo(
            Asset::class
        );

    }

}
