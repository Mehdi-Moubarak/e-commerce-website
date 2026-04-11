<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PayementController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public auth routes (rate-limited: 10 attempts per minute)
Route::middleware('throttle:10,1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
});

// Authenticated user routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);

    // Customer orders
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

    // Comments (any logged-in user can post/view)
    Route::get('comments', [CommentController::class, 'index']);
    Route::get('comments/{id}', [CommentController::class, 'show']);
    Route::post('comments', [CommentController::class, 'store']);
});

// Public read routes (shop browsing)
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::get('category', [CategoryController::class, 'index']);
Route::get('category/{idCategory}', [CategoryController::class, 'show']);
Route::get('discounts', [DiscountController::class, 'index']);
Route::get('discounts/{id}', [DiscountController::class, 'show']);

// Coupon validation (public)
Route::get('coupons/{code}', function ($code) {
    $discount = \App\Models\Discount::where('label', $code)->first();
    if (!$discount) {
        return response()->json(['message' => 'Invalid coupon code.'], 404);
    }
    return response()->json(['discount' => $discount], 200);
});

// Admin-only routes
Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {

    // Admin orders
    Route::get('admin/orders', [OrderController::class, 'adminIndex']);
    Route::put('admin/orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::get('admin/stats', [OrderController::class, 'stats']);

    // Products (write)
    Route::post('products', [ProductController::class, 'store']);
    Route::put('productsUpdate/{id}', [ProductController::class, 'update']);
    Route::delete('productdelete/{id}', [ProductController::class, 'destroy']);

    // Categories (write)
    Route::post('category', [CategoryController::class, 'store']);
    Route::put('categoryUpdate/{id}', [CategoryController::class, 'update']);
    Route::delete('categoryDelete/{id}', [CategoryController::class, 'destroy']);

    // Users (full management)
    Route::get('users', [UserController::class, 'index']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::post('users', [UserController::class, 'store']);
    Route::put('usersUpdate/{id}', [UserController::class, 'update']);
    Route::delete('userdelete/{id}', [UserController::class, 'destroy']);

    // Discounts (write)
    Route::post('discounts', [DiscountController::class, 'store']);
    Route::put('discountsUpdate/{id}', [DiscountController::class, 'update']);
    Route::delete('discountDelete/{id}', [DiscountController::class, 'destroy']);

    // Comments (admin moderation)
    Route::put('commentsUpdate/{id}', [CommentController::class, 'update']);
    Route::delete('commentsDelete/{id}', [CommentController::class, 'destroy']);

    // Payments
    Route::get('payements', [PayementController::class, 'index']);
    Route::get('payements/{id}', [PayementController::class, 'show']);
    Route::post('payements', [PayementController::class, 'store']);
    Route::put('payementsUpdate/{id}', [PayementController::class, 'update']);
    Route::delete('payementsDelete/{id}', [PayementController::class, 'destroy']);
});
