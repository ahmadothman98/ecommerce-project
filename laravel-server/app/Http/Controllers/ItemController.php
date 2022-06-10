<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Item;

use App\Models\Favorite;

use Auth;

class ItemController extends Controller
{
    public function addItem(Request $request){
        

        $item = new Item;
        $item->name = $request ->name;
        $item->description = $request -> description;
        $item->price = $request -> price;
        $item->image = $request -> image;
        $item->category_name = $request -> catagory_name;
        $item -> save();
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
        

    }
    
    public function getItems($id = null){
        if(!$id){
            $items = Item::all();
            return response() -> json([
                "status" => "success",
                "items" => $items
            ],200);
        }
        else{
            $item = Item::find($id);
            $item->catagory_name = Catagory::find($item->catagory_id)->name;
            
            ////check if user has the item as favorite
            $user = Auth::user();
            if($user){
                $is_favorite = Favorite::where('user_id',$user->id);
            }
            return response() -> json([
                "status" => "success",
                "item" => $item
            ],200);
        }

    }
    public function getItemsByCategory($id){
        $items = Item::where('category_id',$id)->get();
        return response -> json([
            "status" => "success",
            "items" => $items
        ]);
    }
    public function addFavorite($id){
        $favorite = new Favorite;
        $favorite->user_id = Auth::user()->id;
        $favorite->item_id = $id;
        $favorite -> save();

        return response -> json([
            'message' => 'success',
        ],200);
    }
}
