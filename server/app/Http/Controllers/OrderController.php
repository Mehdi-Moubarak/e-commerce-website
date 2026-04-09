<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /** Customer: create a new order */
    public function store(Request $request)
    {
        $request->validate([
            'items'           => 'required|array|min:1',
            'items.*.id'      => 'required|integer|exists:products,id',
            'items.*.name'    => 'required|string',
            'items.*.price'   => 'required|numeric|min:0',
            'items.*.quantity'=> 'required|integer|min:1',
            'billing_address' => 'required|string|max:500',
            'payment_method'  => 'nullable|string|max:50',
            'notes'           => 'nullable|string|max:1000',
        ]);

        $items = $request->items;
        $total = array_reduce($items, fn($sum, $item) => $sum + ($item['price'] * $item['quantity']), 0);

        // Apply discount if provided
        $discountAmount = 0;
        if ($request->filled('coupon_code')) {
            $discount = \App\Models\Discount::where('label', $request->coupon_code)->first();
            if ($discount) {
                $discountAmount = round($total * ($discount->value / 100), 2);
                $total = max(0, $total - $discountAmount);
            }
        }

        $order = Order::create([
            'customer_id'     => $request->user()->id,
            'total_price'     => round($total, 2),
            'status'          => 'pending',
            'payment_status'  => 'unpaid',
            'payment_method'  => $request->payment_method ?? 'bank_transfer',
            'billing_address' => $request->billing_address,
            'notes'           => $request->notes,
        ]);

        foreach ($items as $item) {
            OrderDetail::create([
                'order_id'     => $order->id,
                'product_id'   => $item['id'],
                'product_name' => $item['name'],
                'quantity'     => $item['quantity'],
                'unit_price'   => $item['price'],
            ]);

            // Decrement stock
            Product::where('id', $item['id'])
                ->where('stock', '>', 0)
                ->decrement('stock', $item['quantity']);
        }

        return response()->json([
            'message' => 'Order placed successfully.',
            'order'   => $order->load('items'),
        ], 201);
    }

    /** Customer: list own orders */
    public function index(Request $request)
    {
        $orders = Order::where('customer_id', $request->user()->id)
            ->with('items')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json(['orders' => $orders], 200);
    }

    /** Customer: get single order (own only) */
    public function show(Request $request, $id)
    {
        $order = Order::where('id', $id)
            ->where('customer_id', $request->user()->id)
            ->with('items')
            ->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found.'], 404);
        }

        return response()->json(['order' => $order], 200);
    }

    /** Admin: list all orders */
    public function adminIndex(Request $request)
    {
        $orders = Order::with(['customer', 'items'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json(['orders' => $orders], 200);
    }

    /** Admin: update order status */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status'         => 'required|in:pending,processing,shipped,delivered,cancelled',
            'payment_status' => 'nullable|in:unpaid,paid,refunded',
        ]);

        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found.'], 404);
        }

        $order->status = $request->status;
        if ($request->filled('payment_status')) {
            $order->payment_status = $request->payment_status;
        }
        $order->save();

        return response()->json([
            'message' => 'Order status updated.',
            'order'   => $order,
        ], 200);
    }

    /** Admin: dashboard stats */
    public function stats()
    {
        $totalOrders    = Order::count();
        $pendingOrders  = Order::where('status', 'pending')->count();
        $totalRevenue   = Order::whereNotIn('status', ['cancelled'])->sum('total_price');
        $totalProducts  = Product::count();
        $totalUsers     = \App\Models\User::where('role', 'customer')->count();
        $recentOrders   = Order::with('customer')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'total_orders'   => $totalOrders,
            'pending_orders' => $pendingOrders,
            'total_revenue'  => round($totalRevenue, 2),
            'total_products' => $totalProducts,
            'total_customers'=> $totalUsers,
            'recent_orders'  => $recentOrders,
        ], 200);
    }
}
