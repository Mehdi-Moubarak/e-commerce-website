<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Add missing columns to detail_orders
        Schema::table('detail_orders', function (Blueprint $table) {
            $table->unsignedBigInteger('order_id')->after('id');
            $table->unsignedBigInteger('product_id')->nullable()->after('order_id');
            $table->string('product_name')->after('product_id');
            $table->integer('quantity')->default(1)->after('product_name');
            $table->decimal('unit_price', 10, 2)->after('quantity');

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('set null');
        });

        // Add billing/notes/payment_method to orders
        Schema::table('orders', function (Blueprint $table) {
            $table->string('payment_method')->default('bank_transfer')->after('payment_status');
            $table->text('billing_address')->nullable()->after('payment_method');
            $table->text('notes')->nullable()->after('billing_address');
        });
    }

    public function down()
    {
        Schema::table('detail_orders', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->dropForeign(['product_id']);
            $table->dropColumn(['order_id', 'product_id', 'product_name', 'quantity', 'unit_price']);
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['payment_method', 'billing_address', 'notes']);
        });
    }
};
