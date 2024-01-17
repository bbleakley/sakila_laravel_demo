<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    use HasFactory;
	protected $table = 'actor';
	protected $primaryKey = "actor_id";

	public function films(){
		return $this->belongsToMany(Film::class, 'film_actor', 'actor_id', 'film_id');
	}
}
