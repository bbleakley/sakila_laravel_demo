<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Address;

class Customer extends Model
{
    use HasFactory;
	protected $table = 'customer';
	protected $primaryKey = "customer_id";

	public function address(){
		return $this->belongsTo(Address::class, "address_id")->first();
	}
}
