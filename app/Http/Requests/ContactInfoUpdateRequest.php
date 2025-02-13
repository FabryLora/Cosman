<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactInfoUpdateRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "mail" => "required|string|max:100",
            "phone" => "required|string|max:100",
            "wp" => "required|string|max:100",
            "location" => "required|string|max:100",
            "iframe" => "nullable|string",
            "ig" => "required|string|max:100",
            "fb" => "required|string|max:100",
        ];
    }
}
