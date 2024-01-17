@extends('layouts.app')
@section('content')
<div class="container">
	<div class="row justify-content-center">
		<div class="col-md-8">
			<div class="card">
				<div class="card-header">Sakila Movie Rental</div>
				<div class="card-body">
					<div class="container">
						<div class="row">
							<div class="col-md-4 text-center">
								<div class="jumbotron">
									<h1>Films</h1>
									<a href="{{ URL::route('films') }}"><button type="button" class="btn btn-primary btn-lg btn-block">View all Films</button></a>
								</div>
							</div>
							<div class="col-md-4 text-center">
								<div class="jumbotron">
									<h1>Customers</h1>
									<a href="{{ URL::route('customers') }}"><button type="button" class="btn btn-primary btn-lg btn-block">View all Customers</button></a>
								</div>
							</div>
							<div class="col-md-4 text-center">
								<div class="jumbotron">
									<h1>Actors</h1>
									<a href="{{ URL::route('actors') }}"><button type="button" class="btn btn-primary btn-lg btn-block">View all Actors</button></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
