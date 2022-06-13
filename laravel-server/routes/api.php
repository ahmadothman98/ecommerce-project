<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
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
Route::get('/get_items/{id?}',[ItemController::class,'getItems'])->name('get-items');
Route::get('/get_items_by_category/{id}',[ItemController::class,'getItemsByCategory'])->name('get-items-by-category');

Route::get('/get_categories/{id?}',[CategoryController::class,'getCategories'])->name('get-categories');

Route::post('/login',[UserController::class,'login'])->name('login');
Route::post('/register',[UserController::class,'register'])->name('login');

Route::group(['middleware' => 'role.user'], function(){
    Route::post('/favorite',[ItemController::class,'addFavorite'])->name('favorite');
});
Route::get('/need_to_login',[ItemController::class,'needToLogin'])->name('need-to-login');

Route::group(['middleware' => 'role.admin'], function(){
    Route::post('/add_item',[ItemController::class,'addItem'])->name('add-item');
    Route::post('/add_category',[CategoryController::class,'addCategory'])->name('add-category');

});

//});