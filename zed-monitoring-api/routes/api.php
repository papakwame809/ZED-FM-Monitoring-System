<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\MaintenanceRecordController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NotificationController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

/*
|--------------------------------------------------------------------------
| Protected Routes (Authenticated Users Only)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // Auth Actions
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Core Domain Resources
    Route::apiResource('incidents', IncidentController::class);
    Route::apiResource('assets', AssetController::class);
    Route::apiResource('maintenance', MaintenanceRecordController::class);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

    /*
    |--------------------------------------------------------------------------
    | Admin-Only Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class);
    });

});
