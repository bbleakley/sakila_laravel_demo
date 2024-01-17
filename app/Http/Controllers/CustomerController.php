<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function list(){
		// return all films
		$customers = [];
		foreach( Customer::all() as $c ){
			$customers[]= [
				// keep id and title separate to use for URL construction
				"id" => $c->customer_id
				,"name" => ucwords(strtolower($c->first_name . " " . $c->last_name))
				,"details" => [
					"Email" => $c->email
					,"Street Address" => $c->address()->address
					,"City" => $c->address()->city()->city
					,"Country" => $c->address()->city()->country()->country
					,"Postal Code" => $c->address()->postal_code
				]
			];
		}
		return view("customers")->with([
			"customers" => $customers
		]);
	}

	public function get($id){
		// get customer details and film checkout history
		$c = Customer::findOrFail($id);
		// query film rental history
		$raw_films = Customer::select(
				"film.*"
				,"category.name as category"
				,"rental_date"
				,"film.rental_duration"
				,"rental.rental_date"
				,"rental.return_date"
				,\DB::raw("DATEDIFF( ifnull(rental.return_date,NOW()), rental.rental_date) as days_checked_out"))
			->join( "rental", "customer.customer_id", "=", "rental.customer_id" )
			->join( "inventory", "rental.inventory_id", "=", "inventory.inventory_id" )
			->join( "film", "inventory.film_id", "=", "film.film_id" )
			->join( "film_category", "film.film_id", "=", "film_category.film_id" )
			->join( "category", "film_category.category_id", "=", "category.category_id" )
			->where( "customer.customer_id", "=", $id )
			->get();
		$films = [];
		foreach( $raw_films as $film ){
			$days_late = 0;
			// specify class based on how late the return was
			$class = "";
			if( $film->days_checked_out > $film->rental_duration ){
				$days_late = $film->days_checked_out - $film->rental_duration;
				if( $days_late > 3 ){
					$class = "table-danger";
				}else{
					$class = "table-warning";
				}
			}
			// store film data
			$films[]= [
				"id" => $film->film_id
				,"name" => $film->title
				,"class" => $class
				,"details" => [
					"Category" => $film->category
					,"Rating" => $film->rating
					,"Year" => $film->release_year
					,"Run Time" => $film->length
					,"Rental Date" => date("Y-m-d",strtotime($film->rental_date))
					,"Return Date" => $film->return_date ? date("Y-m-d",strtotime($film->return_date)) : ""
					,"Days Checked Out" => $film->days_checked_out
					,"Days Late" => $days_late
				]
			];
		}
		return view("customer")->with([
			"name" => ucwords(strtolower($c->first_name . " " . $c->last_name))
			,"details" => [
				"Email" => $c->email
				,"Street Address" => $c->address()->address
				,"City" => $c->address()->city()->city
				,"Country" => $c->address()->city()->country()->country
				,"Postal Code" => $c->address()->postal_code
			]
			,"films" => $films
		]);
	}
}
