<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePolicyRequest extends FormRequest
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
            'type' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'in:active,in-active,disabled'],
            'effective_date' => ['required', 'date', 'after_or_equal:today', 'before:expiration_date'],
            'expiration_date' => ['required', 'date', 'after:effective_date'],
        ];
    }

    /**
     * Custom messages for validation errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'status.required' => 'The policy status is required.',
            'status.in' => 'The policy status must be active, inactive, or cancelled.',
            'type.required' => 'The policy type is required.',
            'effective_date.required' => 'The effective date is required.',
            'effective_date.after_or_equal' => 'The effective date must be today or later.',
            'effective_date.before' => 'The effective date must be before the expiration date.',
            'expiration_date.required' => 'The expiration date is required.',
            'expiration_date.after' => 'The expiration date must be after the effective date.',
        ];
    }
}
