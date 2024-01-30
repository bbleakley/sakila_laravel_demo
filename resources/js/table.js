class tableUtil{

	table = document.querySelector("#datatable");
	tableBody = this.table.querySelector("tbody");
	tableHead = this.table.querySelector("thead");
	currentPage = 0;
	searchBlacklist = [];
	filterable = [];
	filter;
	pageSelector;
	pageLengthSelector;
	pageCount;

	init(){
		// check configurations
		this.checkConfigurations();
		// insert records per page select and search bar
		this.setupFilter();
		this.table.insertAdjacentHTML("beforebegin",
		`<div class="container pt-4 pb-2">
			<div class="row">
				<div class="col-md-6">
					<p class="my-auto">Show <select id='pageLengthSelect' data-value=10>
						<option value=10>10</option>
						<option value=20>20</option>
						<option value=50>50</option>
					</select> records</p>
				</div>
				<div class="col-md-6 d-flex flex-row-reverse">
					<input class="searchInput rounded" type="text" placeholder="Search..."></input>
				</div>
			</div>
		</div>`);
		// insert jump to page buttons container
		this.table.insertAdjacentHTML("afterend","<div id='pageSelector' class='d-flex flex-row'></div>");
		this.pageSelector = document.querySelector("#pageSelector");
		this.pageLengthSelector = document.querySelector("#pageLengthSelect");
		this.searchBar = document.querySelector(".searchInput");
		// display the default number of rows and trigger listeners
		this.updateView();
		this.listen();
	}

	checkConfigurations(){
		this.tableHead.querySelectorAll("th").forEach((h, i) => {
			// identify the indexes of non-searchable columns
			if( h.dataset.searchable === "false" ){
				this.searchBlacklist.push(i);
			}
			// identify columns that can be filtered
			if( h.dataset.filterable === "true" ){
				this.filterable.push({index:i, label:h.textContent});
			}
		});
	}

	updateView(){
		// update the visible rows
		this.updateResults();
		// update pagination buttons
		this.updatePageSelector();
	}

	updateResults(){
		// update visible rows after any change request from the user
		let rows = Array.from(this.tableBody.children).filter(r => {
			return ! r.classList.contains("queryFiltered");
		});
		let count = rows.length;
		let pageLength = +this.pageLengthSelector.value;
		this.pageCount = Math.ceil(count / pageLength) - 1;
		// identify the first and last rows to show
		let start = this.currentPage * pageLength;
		let end = Math.min(start + pageLength, count);
		for( let i = 0; i < count; i++ ){
			if( i < start || i >= end ){
				// hide any rows before or after the desired result set
				rows[i].classList.add("d-none");
			}else{
				// show any rows within the desired result set
				rows[i].classList.remove("d-none");
			}
		}
	}

	updatePageSelector(){
		// update pagination buttons e.g. if the user changes the number of visible rows
		// clear the current pagination buttons
		this.pageSelector.innerHTML = "";
		let addEndEllipsis = false;
		let addStartEllipsis = false;
		// use ellipses for larger datasets to avoid having a button for every page
		if( this.pageCount > 6 ){
			// only include an ellipsis if the current page isn't close to the first/last age
			if( this.currentPage > 3 ){
				addStartEllipsis = true;
			}
			if( this.currentPage < this.pageCount - 3 ){
				addEndEllipsis = true;
			}
		}
		let divs = [];
		// loop through every potential pagination button
		for( let i=0; i <= this.pageCount; i++ ){
			// add a class if the button references the current page
			let colorClass = i == this.currentPage ? 'bg-info' : 'bg-light paginationBtn';
			// if we need a start ellipsis, show the button for the first page and then the ellipsis
			if( addStartEllipsis ){
				divs.push(this.renderPageDiv(`1`,colorClass,"0"));
				// the ellipsis doesn't have the paginationBtn class because it's not a button
				divs.push(this.renderPageDiv(`...`));
				addStartEllipsis = false;
			}
			// skip buttons that aren't close to the current page
			// unless the current page is close to the first/last page
			if( i < this.currentPage - 2 && i < this.pageCount - 4 && this.currentPage > 3){
				continue;
			}
			// add a button for pages close to the current page
			if( i < this.currentPage + 3 || i < 5 ){
				divs.push(this.renderPageDiv(`${i + 1}`,colorClass,`${i}`));
				continue;
			}
			// after adding the buttons for pages close to the current page, add an ellipsis and a link to the last page and break out of the loop
			// if the current page is close to the end, this code won't execute and the last few page buttons will all be visible
			if( addEndEllipsis ){
				divs.push(this.renderPageDiv(`...`));
				divs.push(this.renderPageDiv(`${this.pageCount + 1}`,colorClass,`${this.pageCount}`));
				break;
			}
		}
		// insert the pagination buttons
		divs.forEach( div => {
			this.pageSelector.insertAdjacentHTML("beforeend",div);
		})
	}

	setupFilter(){
		// bail if none of the columns are filterable.
		if( ! this.filterable ){
			return;
		}
		let div = `<div class="row">
			<div class="col-sm-3 text-center justify-content-center align-self-center">
					<h5>Filter</h5>
			</div>
			<div class="filterContainer col-md-6 p-2">
			</div>
		</div>`;
		this.table.insertAdjacentHTML("beforebegin",div);
		this.filter = document.querySelector(".filterContainer");
		this.addFilterConfig();
	}

	addFilterConfig(){
		let options = "";
		this.filterable.forEach( filter => {
			options = options + `<option value=${filter.index}>${filter.label}</option>`;
		});
		let filterRow = `<div class="filterConfig d-flex flex-row border rounded p-2">
			<button type="button" class="btnAddFilter filterBtn p-0 border-0 mx-1">[ + ]</button>
			<button type="button" class="btnRemoveFilter filterBtn p-0 border-0 mx-1">[ - ]</button>
			<select class="filterColumn mx-auto">
				<option disabled selected>Select a Column</option>
				${options}
			</select>
			<select class="filterCompare mx-auto">
				<option value="equals">Equals</option>
				<option value="notEqual">Does not Equal</option>
				<option value="contains">Contains</option>
				<option value="notContains">Does not Contain</option>
			</select>
			<input class="filterValue mx-auto"></input>
		</div>`;
		this.filter.insertAdjacentHTML("beforeend",filterRow);
	}

	listen(){
		// changes to the current page of the result set
		this.pageChangeListener();
		// changes to the number of visible rows per page
		this.pageLengthChangeListener();
		// changes to the sort order
		this.sortListener();
		// listen for search queries
		this.searchListener();
		// listen for filter updates
		this.filterListener();
	}

	pageChangeListener(){
		// if the user selects a different page, update the current page and refresh the view
		this.pageSelector.addEventListener("click", e => {
			const btn = e.target.closest(".paginationBtn");
			if( ! btn ){
				return;
			}
			this.currentPage = +btn.dataset.goto;
			this.updateView();
		});
	}

	pageLengthChangeListener(){
		// if the user requests a different number of results per page, refresh the view
		this.pageLengthSelector.addEventListener("change", e => {
			// keep the first row in the current result set visible
			let previousLength = +this.pageLengthSelector.dataset.value;
			let newLength = +this.pageLengthSelector.value;
			let firstRow = this.currentPage * previousLength;
			this.currentPage = Math.floor(firstRow / newLength);
			this.pageLengthSelector.dataset.value = newLength;
			this.updateView();
		});
	}

	sortListener(){
		// sort when a column header is clicked
		this.table.querySelector("thead").addEventListener("click", e =>{
			let col = e.target.closest("th");
			let index = Array.from(col.parentNode.children).indexOf(col);
			// default the sort to asc
			let sort = "ascTableSort";
			let img = '<i class="mx-1 sortIcon bi bi-sort-up"></i>';
			// if the column is already sorted asc or if the default sort is set to desc, sort desc
			if( col.classList.contains("ascTableSort") || col.dataset.sort == "desc" ){
				sort = "descTableSort";
				img = '<i class="mx-1 sortIcon bi bi-sort-down"></i>';
			}
			// remove existing icon and add new one
			let existingIcon, descSorted, ascSorted;
			if( existingIcon = this.tableHead.querySelector(".sortIcon") ){
				existingIcon.remove();
			}
			// insert sort icon
			col.insertAdjacentHTML("beforeend",img);
			// remove any previously applied sort classes
			if( ascSorted = this.tableHead.querySelector(".ascTableSort") ){
				ascSorted.classList.remove("ascTableSort");
			}
			if( descSorted = this.tableHead.querySelector(".descTableSort") ){
				descSorted.classList.remove("descTableSort");
			}
			col.classList.add(sort);
			// sort rows
			Array.from(this.tableBody.querySelectorAll('tr'))
				.sort((a, b) => {
					let val1 = a.children[index].textContent;
					let val2 = b.children[index].textContent;
					let sortModifier = sort == "ascTableSort" ? 1 : -1;
					// compare as numbers if possible
					if( ! isNaN(+val1) && ! isNaN(+val2) ){
						return (+val1 - +val2) * sortModifier;
					}
					return val1.toString().localeCompare(val2) * sortModifier;
				})
				.forEach(tr => this.tableBody.appendChild(tr) );
			this.currentPage = 0;
			this.updateView();
		})
	}

	searchListener(){
		this.searchBar.addEventListener("input", e =>{
			this.searchAndFilter();
		})
	}

	filterListener(){
		// listen for changes to the filter
		this.filter.addEventListener("input", e =>{
			this.searchAndFilter();
		});
		// listen for add/remove button clicks
		this.filter.addEventListener("click", e=>{
			let target = e.target;
			// change focus to button if icon was clicked
			if( target.classList.contains("bi") ){
				target = target.parentNode;
			}
			// bail if the click wasn't on a button
			if( ! target.classList.contains("filterBtn") ){
				return;
			}
			// add a config filter if add button is pressed
			if( target.classList.contains("btnAddFilter") ){
				this.addFilterConfig();
			}
			// remove the config filter if remove button is pressed
			if( target.classList.contains("btnRemoveFilter") ){
				e.target.closest(".filterConfig").remove();
				// add a new filter if removed filter was the only one
				if( ! this.filter.children ){
					this.addFilterConfig();
				}
				// update results in case the removed filter had impacted the result set
				this.searchAndFilter();
			}
		})
	}

	searchAndFilter(){
		// check if filter is configured
		let filter = [];
		let filterColumn, filterCompare, filterVal;
		if( this.filterable ){
			// add each full defined filter config to the filter array
			this.filter.querySelectorAll(".filterConfig").forEach( c =>{
				filterColumn = +c.querySelector(".filterColumn").value;
				filterCompare = c.querySelector(".filterCompare").value;
				filterVal = c.querySelector(".filterValue").value.toUpperCase();  
				if( ! isNaN(filterColumn) && filterCompare && filterVal ){
					filter.push({
						filterColumn: filterColumn
						,filterCompare: filterCompare
						,filterVal: filterVal
					});
				}
			});
		}
		let query = this.searchBar.value.toUpperCase();
		// check each row to see if it matches the filter
		Array.from(this.tableBody.children).forEach( r =>{
			let match;
			filter.forEach( f => {
				// bail if a previous filter didn't match
				if( match === false ){
					return;
				}
				// compare filter value
				let value = r.children[f.filterColumn].textContent.toUpperCase();
				switch( f.filterCompare ){
					case "equals":
						match = value === f.filterVal;
						break;
					case "notEqual":
						match = value !== f.filterVal;
						break;
					case "contains":
						match = value.includes(f.filterVal);
						break;
					case "notContains":
						match = ! value.includes(f.filterVal);
						break;
				}
			});
			// if it isn't omitted by the filter, check for search matches
			if( match !== false ){
				match = false;
				Array.from(r.children).forEach( (c, i) => {
					// don't search blacklisted columns
					if( this.searchBlacklist.includes(i) ){
						return;
					}
					if( c.textContent.toUpperCase().includes(query) ){
						match = true;
						return;
					}
				});
			}
			if( match ){
				r.classList.remove("queryFiltered","d-none");
			}else{
				r.classList.add("queryFiltered","d-none");
			}
		});
		// update view
		this.currentPage = 0;
		this.updateView();
	}

	renderPageDiv(value, extraClasses="", goto=false ){
		// utility function to create pagination divs
		let gotoString = goto ? `data-goto="${goto}"` : "";
		let classes = "paginationKey p-2 rounded " + extraClasses;
		return `<div class='${classes}' ${gotoString}>${value}</div>`;
	}

}

let tableUtility = new tableUtil();
tableUtility.init();