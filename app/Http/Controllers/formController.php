<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use App\Http\Controllers\Controller;
use App\Notification;


class formController extends Controller
{
    public function insert(Request $request){
		$request->validate([
			'nombre'=>'string|required|min:2|max:255',
			'email'=>'email|required|min:6|max:255',
			'mensaje'=>'required|min:1|max:255']
		);

    	$data = new Message; 

    	//pillar los daos del input

    	$data->name=$request->input('nombre');
    	$data->email=$request->input('email');
    	$data->message=$request->input('mensaje');

    	$data->save(); 

        $admins=User::join('roles','users.role_id','roles.id')->where('roles.nombre','admin')->get();
        foreach ($admins as $admin) {
            $n=new Notification;
            $n->tipo=$tipo;
            $n->para=$admin->id;
            $n->save();
        }

    	return view('pages/index'); 
    }
}
