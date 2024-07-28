<?php

namespace App\Http\Requests;
 
use Illuminate\Foundation\Http\FormRequest;

class CommentStoreRequest extends FormRequest
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
                'label' => 'required|string',
                'user' => 'required',
                'product' => 'required'
            ];
        } else {
            return [
                'label' => 'required|string',
                'user' => 'required',
                'product' => 'required'
            ];
        }
    }
  
    public function messages()
    {
        if(request()->isMethod('post')) {
            return [
                'label.required' => 'Label is required!',
                'user.required' => 'User is required!',
                'product.required' => 'Product is required'
            ];
        } else {
            return [
                'label.required' => 'Label is required!',
                'user.required' => 'User is required!',
                'product.required' => 'Product is required'
            ];   
        }
    }
}