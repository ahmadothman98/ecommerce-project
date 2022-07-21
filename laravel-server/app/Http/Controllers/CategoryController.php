<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Category;

use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function addCategory(Request $request){
        $category = new Category;
        $category -> name = $request -> name;
        //if($request->hasFile('image')){
            $category->image = "$request->image->store('/Assets/img')";
    //    } 
        $category -> save();
        return response()->json([
            'message' => 'Category successfully added',
            'category' => $category
        ], 201);
    }
    public function getCategories($id = 0){
        if(!$id){
            $categories = Category::All();

            return response()->json([
                'message' => "success",
                'categories' => $categories
            ],200);
        }
        else{
            $category = Category::find($id);
            return response()->json([
                'message' => "success",
                'category' => $category
            ],200);
        }
    }
}
