<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    protected $table = 'addresses';

    protected $fillable = [
        'user_id',
        'street',
        'city',
        'state',
        'state',
        'zip'
    ];

    const USER_ID = 'user_id';
    const STREET = 'street';
    const CITY = 'city';
    const STATE = 'state';
    const ZIP = 'zip';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    public function relatedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function getUser()
    {
        return $this->relatedUser()->first();
    }
}
