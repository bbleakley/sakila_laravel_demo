class tableUtil{

	table = document.querySelector("#datatable");
	tableBody = this.table.querySelector("tbody");
	currentPage = 0;
	pageSelector;
	pageCount;

	init(){
		// insert recrods per page select
		this.table.insertAdjacentHTML("beforebegin",
		`<p>Show <select id='pageLengthSelect'>
				<option value=10>10</option>
				<option value=20>20</option>
				<option value=50>50</option>
			</select> records</p>`);
		// insert jump to page buttons
		this.table.insertAdjacentHTML("afterend","<div id='pageSelector' class='d-flex flex-row'></div>");
		this.pageSelector = document.querySelector("#pageSelector");
		this.updateView();
		this.pageChangeListener();
	}

	updateView(){
		this.updateResults();
		this.updatePageSelector();
	}

	updateResults(){
		let rows = this.tableBody.querySelectorAll("tr");
		let count = rows.length;
		let pageLength = +document.querySelector("#pageLengthSelect").value;
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
				divs.push(`<div
						data-goto='0'
						class='paginationKey paginationBtn p-2 ${active}'
					>1</div>
					<div
						class='paginationKey p-2'
					>...</div>`);
				addStartElipsis = false;
			}
			if( i < this.currentPage - 2 && i < this.pageCount - 4 ){
				continue;
			}
			if( i < this.currentPage + 3 || i < 5 ){
				divs.push(`<div
					data-goto='${i}'
					class='paginationKey paginationBtn p-2 ${active}'
				>${i + 1}</div>`);
				continue;
			}
			if( addEndElipsis ){
				divs.push(`<div
					class='paginationKey p-2'
				>...</div>
				<div
					data-goto='${this.pageCount}'
					class='paginationKey paginationBtn p-2 ${active}'
				>${this.pageCount + 1}</div>`);
				break;
			}
		}
		divs.forEach( div => {
			this.pageSelector.insertAdjacentHTML("beforeend",div);
		})
	}

	pageChangeListener() {
		this.pageSelector.addEventListener("click", e => {
			const btn = e.target.closest(".paginationBtn");
			if( ! btn ){
				return;
			}
			this.currentPage = +btn.dataset.goto;
			this.updateView();
		});
	}

}

let tableUtility = new tableUtil();
tableUtility.init();
