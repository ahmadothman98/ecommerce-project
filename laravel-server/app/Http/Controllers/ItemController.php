<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Item;


class ItemController extends Controller
{
    public function uploadItem(Request $request){
        

        $item = new Item;
         $item->name = $request ->name;
         $item->description = $request -> description;
         $item->price = $request -> price;
         $item->image = $request -> image;
         $item->category = $request -> catagory;
         $item -> save();
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    

    }
}
