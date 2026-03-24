<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->decimal('total_price', 10, 2)->default(0)->after('id');
            $table->string('status')->default('pending')->after('total_price');
            $table->string('payment_status')->default('unpaid')->after('status');
            $table->unsignedBigInteger('customer_id')->nullable()->after('payment_status');
            $table->unsignedBigInteger('panier_id')->nullable()->after('customer_id');

            $table->foreign('customer_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
            $table->dropColumn(['total_price', 'status', 'payment_status', 'customer_id', 'panier_id']);
        });
    }
};
