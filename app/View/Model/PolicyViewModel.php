<?php
namespace App\View\Model;

use App\Models\Address;
use App\Models\Policy;
use App\Models\User;
use Spatie\ViewModels\ViewModel;

class PolicyViewModel extends ViewModel
{
    private ?Policy $policy;
    private ?User $account_holder;
    private ?Address $address;

    public function __construct(Policy $policy = NULL , User $account_holder = NULL, Address $address = NULL)
    {
        $this->policy = $policy;
        $this->address = $address;
        $this->account_holder = $account_holder;
    }

    public function policy(): Policy
    {
        return $this->policy ??= new Policy();
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
            'zipcode' => $this->address->zip,
        ];
    }
}
