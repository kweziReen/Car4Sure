<?php

use App\Http\Controllers\VehiclesController;
use Illuminate\Support\Facades\Route;

Route::controller(VehiclesController::class)->group(function () {
    Route::prefix('vehicles')->group(function () {
        Route::get('/create', 'create')->name('create-vehicle');
        Route::post('/save/{policy}', 'store')->name('add-vehicle');
        Route::get('/edit/{vehicle_id}', 'edit')->name('edit-vehicle');
        Route::patch('update/{vehicle}', 'update')->name('update-vehicle');
        Route::get('/delete/{vehicle_id}', 'destroy')->name('delete-vehicle');
        Route::patch('/update/garage/{vehicle}', 'updateVehicleGarage')->name('update-vehicle-garage');
        Route::patch('/update/vehicle/{vehicle}', 'updateVehicleCoverage')->name('update-vehicle-coverage');
        Route::get('/delete/{vehicle}/{coverage_id}', 'detachCoverage')->name('delete-coverage');
    });
});
