<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceRecord extends Model // (or MaintenanceRecord)
{
    use HasFactory;

    protected $table = 'maintenance_records'; // Match your table name

    protected $fillable = [
        'asset_id',
        'title',
        'task',         // 👈 Required by SQLite
        'type',
        'status',
        'maintenance_date',
        'next_due_date',
        'notes',
        'cost',
    ];
}
