@extends("layouts.app")
@section("title","Actors")
@section("content")
<div class="jumbotron">
	<div class="container">
		<h1>Actors</h1>
	</div>
</div>
<div class="container">
	<div class="row">
		<div class="col-xl-12">
			<table class="table table-striped">
				<thead>
					<tr>
						<th>Name</th>
						@foreach( array_keys($actors[0]["details"]) as $h )
							<th>{{ $h }}</th>
						@endforeach
					</tr>
				</thead>
				<tbody>
					@foreach( $actors as $a )
						<tr>
							<td><a href="{{ URL::route('actor', $a['id']) }}">{{ $a["name"] }}</a></td>
							@foreach( $a["details"] as $_ => $val )
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
