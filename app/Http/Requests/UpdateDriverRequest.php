<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateDriverRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'surname' => ['required', 'string', 'max:255'],
            'age' => ['required', 'integer'],
            'gender' => ['required', 'string', 'max:255', 'in:male,female,other'],
            'marital_status' => ['required', 'string', 'max:255','in:single,married,widow,separated,divorced,other'],
            'license_number' => ['required', 'string', 'max:255'],
            'license_status' => ['required', 'string', 'max:255', 'in:valid,invalid'],
            'license_state' => ['required', 'string', 'max:255'],
            'license_class' => ['required', 'string', 'max:255', 'in:code-3,code-8,code-10,code-14'],
            'effective_date' => ['required', 'date', 'before:expiration_date'],
            'expiration_date' => ['required', 'date', 'after:effective_date'],
        ];
    }
}
