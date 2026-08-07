<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{

    protected $fillable = [

        'asset_id',

        'title',

        'description',

        'severity',

        'status',

        'incident_date',

    ];



    protected $casts = [

        'incident_date' => 'date',

    ];



    public function asset()
    {

        return $this->belongsTo(
            Asset::class
        );

    }

}
