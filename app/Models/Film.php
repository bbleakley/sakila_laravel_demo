<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory;
	protected $table = 'film';
	protected $primaryKey = "film_id";

	public function actors(){
		return $this->belongsToMany(Actor::class, "film_actor", "film_id", "actor_id");
	}

	public function category(){
		return $this->belongsToMany(Category::class, "film_category", "film_id", "category_id")->first();
	}

	public function language(){
		return $this->belongsTo(Language::class, "language_id")->first();
	}

	public function original_language(){
		return $this->belongsTo(Language::class, "original_language_id")->first();
	}

}
