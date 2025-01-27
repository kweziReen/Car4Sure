<?php

use App\Http\Controllers\PolicyController;
use Illuminate\Support\Facades\Route;

Route::controller(PolicyController::class)->group(function () {
    Route::prefix('policy')->group(function () {
        Route::get('/details', 'index')->name('policy-details');
        Route::get('/create', 'create')->name('create-create');
        Route::post('/save', 'store')->name('store-policy');
        Route::get('/edit/{policy}',  'edit')->name('edit-policy');
        Route::patch('/update/{policy}', 'update')->name('update-policy');
        Route::patch('/update/holder/{policy}', 'updatePolicyHolder')->name('update-policy-holder');
        Route::patch('/update/address/{policy}', 'updatePolicyAddress')->name('update-policy-address');
        Route::delete('/delete', 'destroy')->name('delete-policy');
    });
});
