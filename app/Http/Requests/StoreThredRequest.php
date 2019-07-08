<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreThredRequest extends FormRequest
{

    public function rules()
    {
        return [
            'title' => 'required|string|max:255'
        ];
    }
    public function messages()
    {
        return [
            'title.required' => 'タイトル必須',
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
