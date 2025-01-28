<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Driver extends Model
{
    protected $table = 'drivers';

    protected $fillable = [
        'policy_id',
        'first_name',
        'last_name',
        'age',
        'gender',
        'marital_status',
        'license_number',
        'license_state',
        'license_status',
        'effective_date',
        'expiration_date',
        'license_class',
    ];

    const POLICY_ID = 'policy_id';
    const FIRST_NAME = 'first_name';
    const LAST_NAME = 'last_name';
    const AGE = 'age';
    const GENDER = 'gender';
    const MARITAL_STATUS = 'marital_status';
    const LICENSE_NUMBER = 'license_number';
    const LICENSE_STATE = 'license_state';
    const LICENSE_STATUS = 'license_status';
    const EFFECTIVE_DATE = 'effective_date';
    const EXPIRATION_DATE = 'expiration_date';
    const LICENSE_CLASS = 'license_class';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    public function relatedPolicy(): BelongsTo
    {
        return $this->belongsTo(Policy::class, 'policy_id');
    }

    public function getPolicy()
    {
        return $this->relatedPolicy()->first();
    }
}
