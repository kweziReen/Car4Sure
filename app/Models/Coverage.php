<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Coverage extends Model
{
    protected $table = 'coverages';

    protected $fillable = [
        'type',
        'limit',
        'deductible'
    ];

    const TYPE = 'type';
    const LIMIT = 'limit';
    const DEDUCTIBLE = 'deductible';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    public function relatedVehicles(): BelongsToMany
    {
        return $this->belongsToMany(Vehicle::class, 'coverage_vehicle', 'coverage_id', 'vehicle_id');
    }
}
