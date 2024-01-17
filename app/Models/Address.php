<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\City;

class Address extends Model
{
    use HasFactory;
	protected $table = 'address';
	protected $primaryKey = "address_id";

	public function city(){
        return $this->belongsTo(City::class, "city_id")->first();
    }
}
