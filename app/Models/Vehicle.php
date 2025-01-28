<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Vehicle extends Model
{
    protected $table = 'vehicles';

    protected $fillable = [
        'policy_id','make', 'model', 'year', 'vin','usage','primary_use','annual_mileage','ownership'
    ];

    const POLICY_ID = 'policy_id';
    const MAKE = 'make';
    const MODEL = 'model';
    const YEAR = 'year';
    const VIN = 'vin';
    const USAGE = 'usage';
    const PRIMARY_USAGE = 'primary_use';
    const ANNUAL_MILEAGE = 'annual_mileage';
    const OWNERSHIP = 'ownership';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    public function relatedPolicy(): BelongsTo
    {
        return $this->belongsTo(Policy::class, 'policy_id');
    }

    public function relatedGarage(): HasOne
    {
        return $this->hasOne(GaragingAddress::class);
    }

    public function relatedCoverages(): BelongsToMany
    {
        return $this->belongsToMany(Coverage::class, 'coverage_vehicle', 'vehicle_id', 'coverage_id');
    }

    public function getPolicy()
    {
        return $this->relatedPolicy()->first();
    }

    public function getGarage()
    {
        return $this->relatedGarage()->first();
    }

    public function getCoverages()
    {
        return $this->relatedCoverages()->get();
    }
}
