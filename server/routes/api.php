<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PayementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});

//api crud admin
//Category
Route::get('category', [CategoryController::class, 'index']); 
Route::get('category/{idCategory}', [CategoryController::class, 'show']); 
Route::post('category', [CategoryController::class, 'store']); 
Route::put('categoryUpdate/{id}', [CategoryController::class, 'update']);
Route::delete('categoryDelete/{id}', [CategoryController::class, 'destroy']);


//Products
Route::get('products', [ProductController::class, 'index']); 
Route::get('products/{id}', [ProductController::class, 'show']); 
Route::post('products', [ProductController::class, 'store']); 
Route::put('productsUpdate/{id}', [ProductController::class, 'update']);
Route::delete('productdelete/{id}', [ProductController::class, 'destroy']);

//Users
Route::get('users', [UserController::class, 'index']); 
Route::get('users/{id}', [UserController::class, 'show']); 
Route::post('users', [UserController::class, 'store']); 
Route::put('usersUpdate/{id}', [UserController::class, 'update']);
Route::delete('userdelete/{id}', [UserController::class, 'destroy']);

//Discounts
Route::get('discounts', [DiscountController::class, 'index']); 
Route::get('discounts/{id}', [DiscountController::class, 'show']); 
Route::post('discounts', [DiscountController::class, 'store']); 
Route::put('discountsUpdate/{id}', [DiscountController::class, 'update']);
Route::delete('discountDelete/{id}', [DiscountController::class, 'destroy']);

//Comment
Route::get('comments', [CommentController::class, 'index']); 
Route::get('comments/{id}', [CommentController::class, 'show']); 
Route::post('comments', [CommentController::class, 'store']); 
Route::put('commentsUpdate/{id}', [CommentController::class, 'update']);
Route::delete('commentsDelete/{id}', [CommentController::class, 'destroy']);

//Payement
Route::get('payements', [PayementController::class, 'index']); 
