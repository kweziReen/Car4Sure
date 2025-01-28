<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class VehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'year' => ['required', 'integer'],
            'make' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'vin' => ['required', 'integer'],
            'usage' => ['required', 'string', 'max:255','in:pleasure,business,other'],
            'primary_use' => ['required', 'string', 'max:255','in:commuting,transportation,deliveries,other'],
            'annual_mileage' => ['required', 'integer'],
            'ownership' => ['required', 'string', 'max:255','in:owner,leased,other'],
        ];
    }
}
