@extends("layouts.app")
@section("title","Actors")
@section("content")
<div class="jumbotron">
	<div class="container">
		<h1>{{ $name }}</h1>
	</div>
</div>
<div class="container">
	<div class="row">
		<div class="col-xl-12">
			<h2>Filmography</h2>
			<table class="table table-striped">
				<thead>
					<tr>
						<th>Title</th>
						@foreach( array_keys($films[0]["details"]) as $h )
							<th>{{ $h }}</th>
						@endforeach
					</tr>
				</thead>
				<tbody>
					@foreach( $films as $f )
						<tr>
							<td><a href="{{ URL::route('film', $f['id']) }}">{{ $f["name"] }}</a></td>
							@foreach( $f["details"] as $_ => $val )
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
