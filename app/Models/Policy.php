<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Policy extends Model
{
    protected $table = 'policies';

    protected $fillable = [
        'user_id',
        'policy_no',
        'policy_status',
        'policy_type',
        'effective_date',
        'expiration_date',
    ];

    const USER_ID = 'user_id';
    const POLICY_NO = 'policy_no';
    const POLICY_STATUS = 'policy_status';
    const POLICY_TYPE = 'policy_type';
    const EFFECTIVE_DATE = 'effective_date';
    const EXPIRATION_DATE = 'expiration_date';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    public function relatedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function relatedDrivers(): HasMany
    {
        return $this->hasMany(Driver::class, 'policy_id', 'id');
    }

    public function getUser()
    {
        return $this->relatedUser()->first();
    }

    public function getDrivers(): Collection
    {
        return $this->relatedDrivers()->get();
    }
}
