<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\ActorController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::get("/films", [FilmController::class, "list"])
	->name("films");

Route::get("/films/{id}", [FilmController::class, "get"])
	->where(["id" => "[0-9]+"])
	->name("film");

Route::get("/actors/{id}",function(){
	return view("home");
})
	->name("actor");

Route::get("/actors",[ActorController::class, "list"])
	->name("actors");
