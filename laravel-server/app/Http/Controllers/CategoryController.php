<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Category;

class CategoryController extends Controller
{
    public function addCategory(Request $request){
        $category = new Category;
        $category -> name = $request -> name;
        $category -> image = $request -> image;
        $category -> save();
        return response()->json([
            'message' => 'Category successfully added',
            'category' => $category
        ], 201);
    }
    public function getCategories($id){
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
