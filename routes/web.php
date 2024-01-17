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

// Home

Route::get('/', function () {
    return view('home');
});

// Films

Route::get("/films", [FilmController::class, "list"])
	->name("films");

Route::get("/films/{id}", [FilmController::class, "get"])
	->where(["id" => "[0-9]+"])
	->name("film");

// Actors

Route::get("/actors",[ActorController::class, "list"])
	->name("actors");

Route::get("/actors/{id}", [ActorController::class, "get"])
    ->where(["id" => "[0-9]+"])
    ->name("actor");
