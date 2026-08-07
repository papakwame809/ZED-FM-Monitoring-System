<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AssetController;
use App\Http\Controllers\MaintenanceRecordController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;


/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::post(
    '/login',
    [AuthController::class, 'login']
);



/*
|--------------------------------------------------------------------------
| Asset Management Routes
|--------------------------------------------------------------------------
*/

Route::apiResource(
    '/assets',
    AssetController::class
);



/*
|--------------------------------------------------------------------------
| Maintenance Routes
|--------------------------------------------------------------------------
*/

Route::apiResource(
    '/maintenance-records',
    MaintenanceRecordController::class
);



/*
|--------------------------------------------------------------------------
| Incident Routes
|--------------------------------------------------------------------------
*/

Route::apiResource(
    '/incidents',
    IncidentController::class
);

Route::get(
    'notifications',
    [NotificationController::class,'index']
);


Route::put(
    'notifications/{id}/read',
    [NotificationController::class,'markAsRead']
);
