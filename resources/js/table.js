class tableUtil{

	table = document.querySelector("#datatable");
	tableBody = this.table.querySelector("tbody");
	currentPage = 0;
	pageSelector;
	pageLengthSelector;
	pageCount;

	init(){
		// insert recrods per page select
		this.table.insertAdjacentHTML("beforebegin",
		`<p>Show <select id='pageLengthSelect' data-value=10>
				<option value=10>10</option>
				<option value=20>20</option>
				<option value=50>50</option>
			</select> records</p>`);
		// insert jump to page buttons
		this.table.insertAdjacentHTML("afterend","<div id='pageSelector' class='d-flex flex-row'></div>");
		this.pageSelector = document.querySelector("#pageSelector");
		this.pageLengthSelector = document.querySelector("#pageLengthSelect");
		this.updateView();
		this.listen();
	}

	updateView(){
		this.updateResults();
		this.updatePageSelector();
	}

	updateResults(){
		let rows = this.tableBody.querySelectorAll("tr");
		let count = rows.length;
		let pageLength = +this.pageLengthSelector.value;
		this.pageCount = Math.ceil(count / pageLength) - 1;
		let start = this.currentPage * pageLength;
		let end = Math.min(start + pageLength, count);
		for( let i = 0; i < count; i++ ){
			if( i < start || i >= end ){
				rows[i].classList.add("d-none");
			}else{
				rows[i].classList.remove("d-none");
			}
		}
	}

	updatePageSelector(){
		this.pageSelector.innerHTML = "";
		let addEndElipsis = false;
		let addStartElipsis = false;
		if( this.pageCount > 6 ){
			if( this.currentPage > 2 ){
				addStartElipsis = true;
			}
			if( this.currentPage < this.pageCount - 3 ){
				addEndElipsis = true;
			}
		}
		let divs = [];
		for( let i=0; i <= this.pageCount; i++ ){
			let active = i == this.currentPage ? 'activePage' : '';
			if( addStartElipsis ){
				divs.push(this.renderPageDiv(`1`,`paginationBtn ${active}`,"0"));
				divs.push(this.renderPageDiv(`...`));
				addStartElipsis = false;
			}
			if( i < this.currentPage - 2 && i < this.pageCount - 4 ){
				continue;
			}
			if( i < this.currentPage + 3 || i < 5 ){
				divs.push(this.renderPageDiv(`${i + 1}`,`paginationBtn ${active}`,`${i}`));
				continue;
			}
			if( addEndElipsis ){
				divs.push(this.renderPageDiv(`...`));
				divs.push(this.renderPageDiv(`${this.pageCount + 1}`,`paginationBtn ${active}`,`${this.pageCount}`));
				break;
			}
		}
		divs.forEach( div => {
			this.pageSelector.insertAdjacentHTML("beforeend",div);
		})
	}

	listen(){
		this.pageChangeListener();
		this.pageLengthChangeListener();
	}

	pageChangeListener(){
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
		this.pageLengthSelector.addEventListener("change", e => {
			// update the number of rows and keep the first row in the current result set visible
			let previousLength = +this.pageLengthSelector.dataset.value;
			let newLength = +this.pageLengthSelector.value;
			let firstRow = this.currentPage * previousLength;
			this.currentPage = Math.floor(firstRow / newLength);
			this.pageLengthSelector.dataset.value = newLength;
			this.updateView();
		});
	}

	renderPageDiv(value, extraClasses="", goto=false ){
		let gotoString = goto ? `data-goto="${goto}"` : "";
		let classes = "paginationKey p-2 " + extraClasses;
		return `<div class='${classes}' ${gotoString}>${value}</div>`;
	}

}

let tableUtility = new tableUtil();
tableUtility.init();
