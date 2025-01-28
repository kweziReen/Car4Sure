<?php

use App\Http\Controllers\DriversController;
use Illuminate\Support\Facades\Route;

Route::controller(DriversController::class)->group(function () {
    Route::prefix('drivers')->group(function () {
        Route::get('/create', 'create')->name('create-driver');
        Route::post('/save/{policy}', 'store')->name('add-driver');
        Route::get('/edit/{driver_id}', 'edit')->name('edit-driver');
        Route::patch('update/{driver}', 'update')->name('update-driver');
        Route::get('/delete/{driver_id}', 'destroy')->name('delete-driver');
    });
});
