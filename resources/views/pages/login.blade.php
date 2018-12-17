@extends('layout.login')

@section('title', 'Registro')

@section('content')


  <div class="masthead text-center text-white d-flex">
    <div class="container my-auto">
        <form id="login">
          <div class="img">
            <img class="img-fluid" src="img/logo.ico" alt="WCSearch">
          </div>
           <div class="form-group">
               <input type="text" class="form-control" id="inputUsuario" placeholder="Usuario">
           </div>
           <div class="form-group">
               <input type="password" class="form-control" id="inputPassword" placeholder="Contraseña">
           </div>
           <div class="forgot">
              <a href="reset.html">Has olvidado la contraseña?</a>
            </div>
           <input type="submit" class="btn btn-primary" value="Iniciar Sesión">
       </form>
      </div>
    </div>



  @endsection
