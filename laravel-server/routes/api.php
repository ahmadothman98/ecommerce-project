<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CatagController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::group(['middleware' => 'api'], function($router) {
    Route::get('/get_items/{id?}',[ItemController::class,'getItems']);
    Route::post('/login',[UserController::class,'login']);
    Route::post('/register',[UserController::class,'register']);
    Route::post('/upload_catagory',[CatagController::class,'uploadCatagory']);
    Route::post('favorite',[ItemController::class,'favorite']);

Route::group(['middleware' => 'role.user'], function(){
    Route::post('/upload_item',[ItemController::class,'uploadItem']);
});

//});