<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Country;

class City extends Model
{
    use HasFactory;
	protected $table = 'city';
	protected $primaryKey = "city_id";

	public function country(){
        return $this->belongsTo(Country::class, "country_id")->first();
    }
}
