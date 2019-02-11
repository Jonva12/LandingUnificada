@extends('layout.app')

@section('title', 'WCSEARCH')


@section('content')
<link rel="stylesheet" href="/css/createWC.css">
<div id="formWC">
  <h1>@lang('createWC.createWC')</h1>
    @if ($errors->any())
      <div class="alert alert-danger">
          <ul>
              @foreach ($errors->all() as $error)
                  <li>{{ $error }}</li>
              @endforeach
          </ul>
      </div>
    @endif
  <form method="post" action="{{route('wc.create')}}" enctype="multipart/form-data">
    @csrf
      <p><label>@lang('createWC.Name'):</label><input type="text"name="nombre" class="form-control" value=""></p>
      <p>@lang('createWC.Direction')</p>
      <div id="mapid"></div>
      <input type="text" id="latitud" name="latitud" value="" hidden>
      <input type="text" id="longitud" name="longitud" value="" hidden>
      <input type="text" id="dir" name="dir" value="" hidden>
      <p><label>Horario Apertura:</label> <input type="time" class="form-control" class="horario" name="horarioApertura" value=""></p>
      <p><label>Horario Cierre: </label><input type="time" class="form-control" class="horario" name="horarioCierre" value=""></p>
      <p><label>24Horas: </label><select name="horas24" id="horas24" class="form-control" >
                  <option value="1">@lang('createWC.Yes')</option>
                  <option value="0" selected>@lang('createWC.No')</option>
                </select></p>
      <p><label>Foto: </label><input type="file" name="foto" class="form-control-file" ></p>
      <p><label>Precio: </label><input type="number" min="0" step="0.05" class="form-control" name="precio" value=""></p>
      <p><label>Accesible: </label><select name="accesibilidad" class="form-control" >
                  <option value="1">@lang('createWC.Yes')</option>
                  <option value="0">@lang('createWC.No')</option>
                </select></p>
    <input type="submit" name="submit" class="btn btn-success" value="@lang('createWC.Submit')">
  </form>
</div>
@include('includes.geoscripts')
<script src="/js/map.js"></script>
<script src="/js/createWC.js"></script>

  @endsection
