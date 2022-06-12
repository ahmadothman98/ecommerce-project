<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Item;

use App\Models\Favorite;

use Auth;

use App\Models\Category;

class ItemController extends Controller
{
    public function addItem(Request $request){
        

        $item = new Item;
        $item->name = $request ->name;
        $item->description = $request -> description;
        $item->price = $request -> price;
        $item->image = $request -> image;
        $item->category_id = $request -> category_id;
        $item -> save();
        return response()->json([
            'message' => 'Item successfully added',
            'item' => $item
        ], 201);
        

    }
    
    public function getItems($id = null){
        if(!$id){
            $items = Item::all();
            foreach($items as $item){
                //avoid errors if category not found
                if(Category::where('id',$item->category_id)){
                    $item->category_name =  Category::where('id',$item->category_id)->value('name');
                }             
            }
            return response() -> json([
                'status' => 'success',
                'items' => $items
            ],200);
        }
        else{
            $item = Item::find($id);

            //avoid errors if category not found
            if(Category::where('id',$item->category_id)){
                $item->category_name =  Category::where('id',$item->category_id)->value('name');
            }
            ////check if user has the item as favorite
            $user = Auth::user();
            if($user){
                $is_favorite = Favorite::where([
                    'user_id',$user->id,
                    'item_id',$item->id
                ]);
                if($is_favorite){
                    $item->$is_favorite = true;
                }
                else{
                    $item->is_favorite = false;
                }
            /////////////

            }
            return response() -> json([
                'status' => 'success',
                'item' => $item
            ],200);
        }

    }
    public function getItemsByCategory($id){
        $items = Item::where('category_id',$id)->get();
        return response() -> json([
            'status' => 'success',
            'items' => $items
        ],200);
    }
    public function addFavorite($id){
        $favorite = new Favorite;
        $favorite->user_id = Auth::user()->id;
        $favorite->item_id = $id;
        $favorite -> save();

        return response() -> json([
            'status' => 'success'
        ],200);
    }
    public function needToLogin(){
        return response() -> json([
            'message' => 'not logged in'
        ]);
    }
}
