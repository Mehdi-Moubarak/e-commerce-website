<?php
 
namespace App\Http\Requests;
 
use Illuminate\Foundation\Http\FormRequest;
 
class ProductStoreRequest extends FormRequest
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
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'name' => 'required|string|max:258',
                'description' => 'required|string',
                'stock' => 'required|integer',
                'price' => 'required|numeric|between:0,9999.99',
                'evaluation' => 'required|numeric|between:0,4.99',
                'category' => 'required',
            ];
        } else {
            return [
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'name' => 'required|string|max:258',
                'description' => 'required|string',
                'stock' => 'required|integer',
                'price' => 'required|numeric|between:0,9999.99',
                'evaluation' => 'required|numeric|between:0,4.99',
                'category' => 'required',
            ];
        }
    }
  
    public function messages()
    {
        if(request()->isMethod('post')) {
            return [
                'name.required' => 'Name is required!',
                'image.required' => 'Image is required!',
                'description.required' => 'Descritpion is required!',
                'stock.required' => 'Stock is required!',
                'price.required' => 'Price is required!',
                'evaluation.required' => 'Evaluation is required!',
                'category.required' => 'Category is required!'
            ];
        } else {
            return [
                'name.required' => 'Name is required!',
                'description.required' => 'Descritpion is required!',
                'stock.required' => 'Stock is required!',
                'price.required' => 'Price is required!',
                'evaluation.required' => 'Evaluation is required!',
                'category.required' => 'Category is required!'
            ];   
        }
    }
}