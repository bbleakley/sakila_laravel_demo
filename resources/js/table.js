class tableUtil{

	table = document.querySelector("#datatable");
	tableBody = this.table.querySelector("tbody");
	count = this.table.querySelectorAll("tbody tr").length;
	currentPage = 0;
	pageSelector;

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
		this.updatePageSelector();
	}

	updatePageSelector(){
		const pages = Math.ceil(this.count / parseInt(document.querySelector("#pageLengthSelect").value)) - 1;
		this.pageSelector.innerHTML = "";
		let addEndElipsis = false;
		let addStartElipsis = false;
		if( pages > 6 ){
			if( this.currentPage > 2 ){
				addStartElipsis = true;
			}
			if( this.currentPage < pages - 3 ){
				addEndElipsis = true;
			}
		}
		let divs = [];
		for( let i=0; i < this.count; i++ ){
			let active = i == this.currentPage ? 'activePage' : '';
			if( addStartElipsis ){
				divs.push(`<div data-goto='0' class='paginationKey paginationBtn p-2 ${active}'>1</div><div class='paginationKey p-2'>...</div>`);
				addStartElipsis = false;
			}
			if( i < this.currentPage - 2 ){
				continue;
			}
			if( i < this.currentPage + 3 || i < 5 ){
				divs.push(`<div data-goto='${i}' class='paginationKey paginationBtn p-2 ${active}'>${i + 1}</div>`);
				continue;
			}
			if( addEndElipsis ){
				divs.push(`<div class='paginationKey p-2'>...</div><div data-goto='${pages}' class='paginationKey paginationBtn p-2 ${active}'>${pages + 1}</div>`);
				break;
			}
		}
		divs.forEach( div => {
			this.pageSelector.insertAdjacentHTML("beforeend",div);
		})
	}

}

let tableUtility = new tableUtil();
tableUtility.init();
