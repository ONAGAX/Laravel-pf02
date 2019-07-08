<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ThredTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $thred = new \App\Thred;
        $thred->title = "あああ";
        $thred->id = 1;
        $thred->save();
        $res = new \App\Responce;
        $res->email = 'onagaway@gmail.com';
        $res->username = 'おなが';
        $res->body = 'おおおおお！';
        $res->thred_id = 1;
        $res->save();

        $read = \App\Thred::where('title', "あああ")->first();
        $this->assertNotNull($read);
    }
}
