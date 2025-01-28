<?php
namespace App\View\Model;

use App\Models\Address;
use App\Models\Driver;
use App\Models\Policy;
use App\Models\User;
use Spatie\ViewModels\ViewModel;

class PolicyViewModel extends ViewModel
{
    private ?Policy $policy;
    private ?User $account_holder;
    private ?Address $address;
    private ?Driver $driver;

    public function __construct(
        Policy $policy = NULL , User $account_holder = NULL, Address $address = NULL, Driver $driver = NULL
    )
    {
        $this->policy = $policy;
        $this->driver = $driver;
        $this->address = $address;
        $this->account_holder = $account_holder;
    }

    public function policy(): Policy
    {
        return $this->policy ??= new Policy();
    }

    public function driver(): Driver
    {
        return $this->driver ??= new Driver();
    }

    public function policyTypes(): array
    {
        return [
            [
                'value' => 'auto',
                'name'  => 'Auto'
            ],
            [
                'value' => 'manual',
                'name'  => 'Manual'
            ],
            [
                'value' => 'hybrid',
                'name'  => 'Hybrid'
            ],
            [
                'value' => 'electric',
                'name'  => 'Electric'
            ]
        ];
    }

    public function policyStatuses(): array
    {
        return [
        [
            'value' => 'active',
            'name'  => 'Active'
        ],
        [
            'value' => 'in-active',
            'name'  => 'In-Active'
        ],
        [
            'value' => 'disabled',
            'name'  => 'Disabled'
        ]
    ];
    }

    public function policyHolder(): ?array
    {
        if (is_null($this->policy) || is_null($this->policy->getUser())) {
            return [];
        }

        $this->account_holder = $this->policy->getUser();
        return [
            'name'    => $this->account_holder->name,
            'surname' => $this->account_holder->surname,
        ];
    }

    public function genderSelect(): array
    {
        return [
            [
                'value' => 'male',
                'name' => 'Male'
            ],
            [
                'value' => 'female',
                'name' => 'Female'
            ],
            [
                'value' => 'other',
                'name' => 'Other'
            ]
        ];
    }

    public function maritalStatuses(): array
    {
        return [
            [
                'value' => 'single',
                'name'  => 'Single'
            ],
            [
                'value' => 'married',
                'name'  => 'Married'
            ],
            [
                'value' => 'widow',
                'name'  => 'Widow'
            ],
            [
                'value' => 'separated',
                'name'  => 'Separated'
            ],
            [
                'value' => 'divorced',
                'name'  => 'Divorced'
            ],
            [
                'value' => 'other',
                'name'  => 'Other'
            ]
        ];
    }

    public function licenceStatuses(): array
    {
        return [
            [
                'value' => 'valid',
                'name'  => 'Valid'
            ],
            [
                'value' => 'invalid',
                'name'  => 'Invalid'
            ]
        ];
    }

    public function licenceClasses(): array
    {
        return [
            [
                'value' => 'code-14',
                'name'  => 'Code 14'
            ],
            [
                'value' => 'code-10',
                'name'  => 'Code 10'
            ],
            [
                'value' => 'code-8',
                'name'  => 'Code 8'
            ],
            [
                'value' => 'code-3',
                'name'  => 'Code 3'
            ]
        ];
    }

    public function stateSelect(): array
    {
        return [
            [
                'value' => 'eastern-cape',
                'name'  => 'Eastern Cape'
            ],
            [
                'value' => 'northern-cape',
                'name'  => 'Northern Cape'
            ],
            [
                'value' => 'western-cape',
                'name'  => 'Western Cape'
            ],
            [
                'value' => 'gauteng',
                'name'  => 'Gauteng'
            ],
            [
                'value' => 'kwaZulu-natal',
                'name'  => 'KwaZulu-Natal'
            ],
            [
                'value' => 'limpopo',
                'name'  => 'Limpopo'
            ],
            [
                'value' => 'mpumalanga',
                'name'  => 'Mpumalanga'
            ],
            [
                'value' => 'north-west',
                'name'  => 'North West'
            ]
        ];
    }

    public function address(): ?array
    {
        if (is_null($this->account_holder) || is_null($this->account_holder->getAddress())) {
            return [];
        }

        $this->address = $this->account_holder->getAddress();

        return [
            'street'  => $this->address->street,
            'city'    => $this->address->city,
            'state'   => $this->address->state,
            'zip' => $this->address->zip,
        ];
    }

    public function drivers(): \Illuminate\Support\Collection
    {
        if (is_null($this->policy) || is_null($this->policy->getDrivers())) {
            return collect();
        }

        return $this->policy->getDrivers();
    }
}
