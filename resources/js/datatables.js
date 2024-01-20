import $ from 'jquery';
window.$ = $;
import DataTable from 'datatables.net-dt';

$(document).ready( function () {
    $("#datatable").DataTable({
        "destroy": true
        ,"paging": true
        ,"bInfo": true
        ,"order": [[0, "asc"]]
        ,"columnDefs": [{
            "orderSequence": ["desc", "asc"]
            ,"targets": ["_all"]
        }]
    });
} );
