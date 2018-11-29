<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableAseos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aseos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->string('localizacion');
            $table->string('dir');
            $table->string('horario');
            $table->string('foto');
            $table->double('precio', 8, 2);
            $table->boolean('accesibilidad');
            $table->unsignedInteger('usuario_id')->nullable();
            $table->timestamps();

            $table->foreign('usuario_id')
              ->references('id')->on('usuarios')
              ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('aseos');
    }
}
