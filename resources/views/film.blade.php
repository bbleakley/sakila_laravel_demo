@extends("layouts.app")
@section("title","Film")
@section("content")
<div class="jumbotron">
	<div class="container">
		<h1>{{$name}}</h1>
	</div>
</div>
<div class="container">
	<div class="row">
		<div class="col-lg-8 FilmDescription">
			<p>{{$description}}</p>
		</div>
	</div>
	<div class="row">
		<div class="col-md-6">
			<h2>Details</h2>
			<table class="table table-hover">
				@foreach( $film_details as $key => $val )
					<tr><td>{{$key}}</td><td>{{$val}}</td></tr>
				@endforeach
			</table>
		</div>
		<div class="col-md-6">
			<h2>Starring</h2>
			<table class="table table-hover">
				@foreach( $actors as $actor_id => $name )
					<tr><td><a href="{{ URL::route('actor', $actor_id) }}">{{$name}}</a></td></tr>
				@endforeach
			</table>
		</h2>
	</div>
</div>
@endsection
