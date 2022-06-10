<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Catagory;

class CatagController extends Controller
{
    public function addCatagory(Request $request){
        $catagory = new Catagory;
        $catagory -> name = $request -> name;
        $catagory -> 
    }
}
