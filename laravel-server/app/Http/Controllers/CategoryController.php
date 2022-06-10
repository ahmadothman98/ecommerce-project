<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Catagory;

class CatagController extends Controller
{
    public function addCatagory(Request $request){
        $category = new Catagory;
        $category -> name = $request -> name;
        $category -> image = $request -> image;
        $category -> save();
    }
    public function getCatagories($id){
        if(!$id){
            $catagories = Catagory::All();
            return response()->json([
                'message' => "success",
                'catagories' => $catagories
            ],200);
        }
        else{
            $catagory = Catagory::find($id);
            return response()->json([
                'message' => "success",
                'catagory' => $catagory
            ],200);
        }
    }
}
