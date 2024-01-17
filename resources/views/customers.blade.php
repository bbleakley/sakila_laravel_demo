@extends("layouts.app")
@section("title","Customers")
@section("content")
<div class="jumbotron">
	<div class="container">
		<h1>Customers</h1>
	</div>
</div>
<div class="container">
	<div class="row">
		<div class="col-xl-12">
			<table class="table table-striped">
				<thead>
					<tr>
						<th>Name</th>
						@foreach( array_keys($customers[0]["details"]) as $h )
							<th>{{ $h }}</th>
						@endforeach
					</tr>
				</thead>
				<tbody>
					@foreach( $customers as $c )
						<tr>
							<td><a href="{{ URL::route('customer', $c['id']) }}">{{ $c["name"] }}</a></td>
							@foreach( $c["details"] as $_ => $val)
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
