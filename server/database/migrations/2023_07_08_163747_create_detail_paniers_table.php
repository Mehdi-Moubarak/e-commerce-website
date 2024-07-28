<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_paniers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('panier_id')
                ->constrained('paniers')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreignId('product')
                ->constrained('products')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->integer('quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detail_paniers');
    }
};
