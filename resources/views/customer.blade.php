@extends("layouts.app")
@section("title","Customer")
@section("content")
<div class="jumbotron">
	<div class="container">
		<h1>{{ $name }}</h1>
	</div>
</div>
<div class="container">
	<div class="row">
		<div class="col-sm-3">
		</div>
		<div class="col-md-6">
			<table class="table table-striped">
				@foreach( $details as $key => $val )
					<tr>
						<td>{{ $key }}</td>
						<td>{{ $val }}</td>
					</tr>
				@endforeach
			</table>
		</div>
		<div class="col-sm-3">
		</div>
	</div>
	<div class="row">
		<div class="col-xl-12">
			<h2>Rental History</h2>
			<table class= "table table-striped">
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
							@foreach( $f["details"] as $key => $val )
								@if( $key === "Days Late" )
									<td class="{{ $f['class'] }}">{{ $val }}</td>
								@else
									<td>{{ $val }}</td>
								@endif
							@endforeach
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	</div>
</div>
@endsection
