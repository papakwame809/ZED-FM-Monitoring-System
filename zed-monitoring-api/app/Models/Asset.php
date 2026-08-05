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


}
