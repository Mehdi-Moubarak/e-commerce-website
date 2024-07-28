<?php

namespace App\Http\Requests;
 
use Illuminate\Foundation\Http\FormRequest;
 
class DiscountStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //return false;
        return true;
    }
 
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        if(request()->isMethod('post')) {
            return [
                'label' => 'required|string|max:258',
                'value' => 'required|string'
            ];
        } else {
            return [
                'label' => 'required|string|max:258',
                'value' => 'required|string'
            ];
        }
    }
  
    public function messages()
    {
        if(request()->isMethod('post')) {
            return [
                'label.required' => 'Label is required!',
                'value.required' => 'Value is required!'
            ];
        } else {
            return [
                'label.required' => 'Label is required!',
                'value.required' => 'Value is required!'
            ];   
        }
    }
}