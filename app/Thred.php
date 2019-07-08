<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thred extends Model
{
    protected $fillable = [
        'title'
    ];

    public function responces()
    {
        return $this->hasMany('App\Responce');
    }
}
