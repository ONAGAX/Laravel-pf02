<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreResponceRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'max:100',
            'body' => 'required|max:255'
        ];
    }
    public function messages()
    {
        return [
            'body.required' => '本文必須',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response['data']    = [];
        $response['status']  = 'NG';
        $response['summary'] = 'Failed validation.';
        $response['errors']  = $validator->errors()->toArray();

        throw new HttpResponseException(
            response()->json($response, 422)
        );
    }
}
