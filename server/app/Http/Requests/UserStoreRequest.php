<?php
 
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
 
class UserStoreRequest extends FormRequest
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
                'first_name' => 'required|string|max:258',
                'last_name' => 'required|string|max:258',
                'email' => 'required|string|max:500',
                'password' => 'required|string|max:258',
                'phone' => 'required|numeric|digits:10',
                'address' => 'required|string|max:258'
            ];
        } else {
            return [
                'first_name' => 'required|string|max:258',
                'last_name' => 'required|string|max:258',
                'email' => 'required|string|max:500',
                'password' => 'required|string|max:258',
                'phone' => 'required|numeric|digits:10',
                'address' => 'required|string|max:258'
            ];
        }
    }
  
    public function messages()
    {
        if(request()->isMethod('post')) {
            return [
                'first_name.required' => 'First Name is required!',
                'last_name.required' => 'Last Name is required!',
                'email.required' => 'Email is required!',
                'password.required' => 'Password is required!',
                'phone.required' => 'Phone is required!',
                'address.required' => 'Address is required!'
            ];
        } else {
            return [
                'first_name.required' => 'First Name is required!',
                'last_name.required' => 'Last Name is required!',
                'email.required' => 'Email is required!',
                'password.required' => 'Password is required!',
                'phone.required' => 'Phone is required!',
                'address.required' => 'Address is required!'
            ];   
        }
    }
}