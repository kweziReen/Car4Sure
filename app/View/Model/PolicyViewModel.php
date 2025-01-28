<?php
namespace App\View\Model;

use App\Models\Address;
use App\Models\Coverage;
use App\Models\Driver;
use App\Models\GaragingAddress;
use App\Models\Policy;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Support\Collection;
use Spatie\ViewModels\ViewModel;

class PolicyViewModel extends ViewModel
{
    private ?Policy $policy;
    private ?User $account_holder;
    private ?Address $address;
    private ?Driver $driver;
    private ?Vehicle $vehicle;
    private ?GaragingAddress $garage;

    public function __construct(
        Policy $policy = NULL, User $account_holder = NULL, Address $address = NULL,
        Driver $driver = NULL, Vehicle $vehicle = NULL, GaragingAddress $garage = NULL
    )
    {
        $this->policy = $policy;
        $this->driver = $driver;
        $this->address = $address;
        $this->account_holder = $account_holder;
        $this->vehicle = $vehicle;
        $this->garage = $garage;
    }

    public function policy(): Policy
    {
        return $this->policy ??= new Policy();
    }

    public function driver(): Driver
    {
        return $this->driver ??= new Driver();
    }

    public function vehicle(): Vehicle
    {
        return $this->vehicle ??= new Vehicle();
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

    public function garage(): array
    {
        if (is_null($this->vehicle) || is_null($this->vehicle->getGarage())) {
            return [];
        }

        $this->garage = $this->vehicle->getGarage();

        return [
            'street'  => $this->garage->street,
            'city'    => $this->garage->city,
            'state'   => $this->garage->state,
            'zip' => $this->garage->zip,
        ];
    }

    public function drivers(): Collection
    {
        if (is_null($this->policy) || is_null($this->policy->getDrivers())) {
            return collect();
        }

        return $this->policy->getDrivers();
    }

    public function vehicles(): Collection
    {
        if (is_null($this->policy) || is_null($this->policy->getVehicles())) {
            return collect();
        }

        return $this->policy->getVehicles();
    }

    public function coverageSelected(): Collection
    {
        if (is_null($this->vehicle) || is_null($this->vehicle->getCoverages())) {
            return collect();
        }

        return $this->vehicle->getCoverages();
    }

    public function coverageSelect():array
    {
        $select_options = [];
        $coverage = Coverage::all();

        foreach ($coverage as $coverage_item) {
            $select_options[] =
                [
                    'value' => $coverage_item->id,
                    'name' => $coverage_item->type
                ];
        }


        return $select_options;
    }

    public function usageSelect(): array
    {
        return [
            [
                'value' => 'pleasure',
                'name'  => 'Pleasure'
            ],
            [
                'value' => 'business',
                'name'  => 'Business'
            ],
            [
                'value' => 'other',
                'name'  => 'Other'
            ]
        ];
    }

    public function primaryUseSelect(): array
    {
        return [
            [
                'value' => 'commuting',
                'name'  => 'Commuting'
            ],
            [
                'value' => 'transportation',
                'name'  => 'Transportation'
            ],
            [
                'value' => 'deliveries',
                'name'  => 'Deliveries'
            ],
            [
                'value' => 'other',
                'name'  => 'Other'
            ]
        ];
    }

    public function ownershipSelect(): array
    {
        return [
            [
                'value' => 'owner',
                'name'  => 'Owner'
            ],
            [
                'value' => 'leased',
                'name'  => 'Leased'
            ],
            [
                'value' => 'other',
                'name'  => 'Other'
            ]
        ];
    }
}
