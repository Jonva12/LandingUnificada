<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditForignkeyComentarios extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comentarios', function (Blueprint $table) {
            $table->dropForeign('comentarios_user_id_foreign');
            $table->dropForeign('comentarios_aseo_id_foreign');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');;
            $table->foreign('aseo_id')->references('id')->on('aseos')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
