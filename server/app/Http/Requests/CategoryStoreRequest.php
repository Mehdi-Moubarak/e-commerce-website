<?php

namespace App\Http\Requests;
 
use Illuminate\Foundation\Http\FormRequest;
 
class CategoryStoreRequest extends FormRequest
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
                'nameCategory' => 'required|string|max:258',
                'description' => 'required|string'
            ];
        } else {
            return [
                'nameCategory' => 'required|string|max:258',
                'description' => 'required|string'
            ];
        }
    }
  
    public function messages()
    {
        if(request()->isMethod('post')) {
            return [
                'nameCategory.required' => 'Name is required!',
                'description.required' => 'Descritpion is required!'
            ];
        } else {
            return [
                'nameCategory.required' => 'Name is required!',
                'description.required' => 'Descritpion is required!'
            ];   
        }
    }
}