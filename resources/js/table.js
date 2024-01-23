class tableUtil{

	table = document.querySelector("#datatable");
	tableBody = this.table.querySelector("tbody");
	currentPage = 0;
	pageSelector;
	pageLengthSelector;
	pageCount;

	init(){
		// insert records per page select
		this.table.insertAdjacentHTML("beforebegin",
		`<p>Show <select id='pageLengthSelect' data-value=10>
				<option value=10>10</option>
				<option value=20>20</option>
				<option value=50>50</option>
			</select> records</p>`);
		// insert jump to page buttons container
		this.table.insertAdjacentHTML("afterend","<div id='pageSelector' class='d-flex flex-row'></div>");
		this.pageSelector = document.querySelector("#pageSelector");
		this.pageLengthSelector = document.querySelector("#pageLengthSelect");
		// display the default number of rows and trigger listeners
		this.updateView();
		this.listen();
	}

	updateView(){
		// update the visible rows
		this.updateResults();
		// update pagination buttons
		this.updatePageSelector();
	}

	updateResults(){
		// update visible rows after any change request from the user
		let rows = this.tableBody.querySelectorAll("tr");
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
			let active = i == this.currentPage ? 'activePage' : '';
			// if we need a start ellipsis, show the button for the first page and then the ellipsis
			if( addStartEllipsis ){
				divs.push(this.renderPageDiv(`1`,`paginationBtn ${active}`,"0"));
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
				divs.push(this.renderPageDiv(`${i + 1}`,`paginationBtn ${active}`,`${i}`));
				continue;
			}
			// after adding the buttons for pages close to the current page, add an ellipsis and a link to the last page and break out of the loop
			// if the current page is close to the end, this code won't execute and the last few page buttons will all be visible
			if( addEndEllipsis ){
				divs.push(this.renderPageDiv(`...`));
				divs.push(this.renderPageDiv(`${this.pageCount + 1}`,`paginationBtn ${active}`,`${this.pageCount}`));
				break;
			}
		}
		// insert the pagination buttons
		divs.forEach( div => {
			this.pageSelector.insertAdjacentHTML("beforeend",div);
		})
	}

	listen(){
		// changes to the current page of the result set
		this.pageChangeListener();
		// changes to the number of visible rows per page
		this.pageLengthChangeListener();
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

	renderPageDiv(value, extraClasses="", goto=false ){
		// utility function to create pagination divs
		let gotoString = goto ? `data-goto="${goto}"` : "";
		let classes = "paginationKey p-2 " + extraClasses;
		return `<div class='${classes}' ${gotoString}>${value}</div>`;
	}

}

let tableUtility = new tableUtil();
tableUtility.init();
