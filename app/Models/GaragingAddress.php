<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GaragingAddress extends Model
{
    protected $table = 'garaging_addresses';

    protected $fillable = [
        'vehicle_id',
        'street',
        'city',
        'state',
        'state',
        'zip'
    ];

    const VEHICLE_ID = 'vehicle_id';
    const STREET = 'street';
    const CITY = 'city';
    const STATE = 'state';
    const ZIP = 'zip';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    public function relatedVehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id', 'id');
    }

    public function getVehicle()
    {
        return $this->relatedVehicle()->first();
    }
}
