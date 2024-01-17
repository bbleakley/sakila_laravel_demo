<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actor;
use App\Models\Film;

class ActorController extends Controller
{
    public function list(){
		$all = Actor::select(
			"actor.actor_id"
			,"first_name"
			,"last_name"
			,\DB::raw("count(film.film_id) as total")
			,\DB::raw("count(g.film_id) as g")
			,\DB::raw("count(pg.film_id) as pg")
			,\DB::raw("count(pg13.film_id) as pg13")
			,\DB::raw("count(r.film_id) as r")
			,\DB::raw("count(nc17.film_id) as nc17")
		)->join( "film_actor", "actor.actor_id", "=", "film_actor.actor_id" )
		->join( "film", "film_actor.film_id", "=", "film.film_id")
		->leftJoin("film as g", function($join){
			$join->on("film_actor.film_id", "=", "g.film_id");
			$join->on("g.rating", "=", \DB::raw("'G'"));
		})
		->leftJoin("film as pg", function($join){
			$join->on("film_actor.film_id", "=", "pg.film_id");
			$join->on("pg.rating", "=", \DB::raw("'PG'"));
		})
		->leftJoin("film as pg13", function($join){
			$join->on("film_actor.film_id", "=", "pg13.film_id");
			$join->on("pg13.rating", "=", \DB::raw("'PG-13'"));
		})
		->leftJoin("film as r", function($join){
			$join->on("film_actor.film_id", "=", "r.film_id");
			$join->on("r.rating", "=", \DB::raw("'R'"));
		})
		->leftJoin("film as nc17", function($join){
			$join->on("film_actor.film_id", "=", "nc17.film_id");
			$join->on("nc17.rating", "=", \DB::raw("'NC-17'"));
		})
		->groupBy("actor.actor_id")
		->get();

		$actors = [];
		foreach( $all as $a ){
			$actors[]= [
				"id" => $a->actor_id
				,"name" => ucfirst($a->first_name) . " " . ucfirst($a->last_name)
				,"details" => [
					"Total Films" => $a->total
					,"G Films" => $a->g
					,"PG Films" => $a->pg
					,"PG-13 Films" => $a->pg13
					,"R Films" => $a->r
					,"NC-17 Films" => $a->nc17
				]
			];
		}
		return view("actors")->with([
			"actors" => $actors
		]);
	}

	public function get($id){
		$actor = Actor::findOrFail($id);
		$all_films = $actor->films;
		$films = [];
		foreach( $all_films as $f ){
			$films[]= [
				"name" => ucwords(strtolower($f->title))
				,"id" => $f->film_id
				,"details" => [
					"Rating" => $f->rating
					,"Release Date" => $f->release_date
					,"Category" => $f->category()->name
					,"Language" => $f->language()->name
				]
			];
		}
		return view("actor")->with([
			"name" => ucwords(strtolower($actor->first_name . " " . $actor->last_name))
			,"films" => $films
		]);
	}

}
