@extends("layouts.app")
@section("title","Films")
@section("content")
<div class="jumbotron">
	<div class="container">
		<h1>Films</h1>
	</div>
</div>
<div class="container">
	<div class="row">
		<div class="col-xl-12">
			<table class="table table-striped">
				<thead>
					<tr>
						@foreach( $film[0]["details"] as $h => $_ )
							<th>{{ $h }}</th>
						@endforeach
					</tr>
				</thead>
				<tbody>
					@foreach( $films as $film )
						<tr>
							<td><a href="{{ URL::route('film', $film['film_id']) }}">{{ $film["title"] }}</a></td>
							@foreach $film["details"] as $_ => $val
								<td>{{ $val }}</td>
							@endforeach
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	</div>
</div>
@endsection
