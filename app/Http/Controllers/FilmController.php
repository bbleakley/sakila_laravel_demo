<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Film;

class FilmController extends Controller
{
    public function list(){
		// return all films
		$films = [];
		foreach( Film::all() as $film ){
			$films[]= [
				// keep id separate to use for URL construction
				"film_id" => $film->film_id
				,"details" => [
					"Title" => $film->title
					,"Release Year" => $film->release_year
					,"Rating" => $film->rating
					,"Run Time" => $film->run_time
					,"Language" => $film->Language()->name
					,"Category" => $film->Category()->name
				]
			];
		}
		return view("films")->with([
			"films" => $films
		]);
	}

	public function get($id){
		// return the details of a specific film
		$film = Film::findOrFail($id);
		$details = [];
		// column names for simple mapping
		$keys = [
			"rating"
			,"length"
			,"release_year"
			,"release_year"
			,"rental_duration"
			,"rental_rate"
			,"replacement_cost"
			,"special_features"
		];
		// store data from related tables first
		$details = [
			"Category" => $film->category()->name
			,"Language" => $film->language()->name
		];
		// check if original language is defined before including it
		if( $og_language = $film->original_language() ){
			$details["Original Language"] = $og_language->name;
		}
		// iterate over keys to get the pretty column label and the corresponding vlaue
		foreach( $keys as $key ){
			// convert "rental_rate" to "Rental Rate"
			$label = ucfirst(implode(" ",explode("_",$key)));
			$details[$label] = $film->$key;
		}
		// return name and description separately as they aren't part of the details table
		return view("film")->with([
			"name" => $film->title
			,"description" => $film->description
			,"film_details" => $details
			,"actors" => []
		]);
	}
}
