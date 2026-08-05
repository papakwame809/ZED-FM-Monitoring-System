<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AssetController;


Route::apiResource(
    'assets',
    AssetController::class
);
