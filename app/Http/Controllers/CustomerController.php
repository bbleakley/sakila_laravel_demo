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

	}
}
