<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Responce extends Model
{
    protected $fillable = [
        'username',
        'email',
        'body'
    ];

    public function threds()
    {
        return $this->belongsTo('App\Thred');
    }
}
