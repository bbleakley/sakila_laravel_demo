@extends("layouts.app")
@section("title","Films")
@section("content")
@vite('resources/js/listView.js')
<div class="jumbotron">
	<div class="container">
		<h1>Films</h1>
	</div>
</div>
<div class="container">
	<div class="row">
		<div class="col-xl-12">
			<table id="datatable" class="table" data-striped="true">
				<thead>
					<tr>
						<th>Title</th>
						@foreach( $films[0]["details"] as $h => $_ )
							@if( in_array($h, ["Release Year", "Language"]) )
								<th data-searchable="false">{{ $h }}</th>
							@elseif( $h === "Run Time" )
								<th data-searchable="false" data-sort="desc">{{ $h }}</th>
							@elseif( $h === "Rating" )
								<th data-filterable="true">{{ $h }}</th>
							@else
								<th>{{ $h }}</th>
							@endif
						@endforeach
					</tr>
				</thead>
				<tbody>
					@foreach( $films as $film )
						<tr>
							<td><a href="{{ URL::route('film', $film['film_id']) }}">{{ $film["title"] }}</a></td>
							@foreach( $film["details"] as $_ => $val)
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
