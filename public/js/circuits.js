$(document)
    .ready(function () {
        $('#circuits_grid').DataTable({
            "searching": false,
            "lengthChange": false,
            "info": false,
            "language": {
                "paginate": {
                    "first": "Inizio",
                    "next": "Successiva",
                    "previous": "Precedente",
                    "last": "Fine"
                },
                "emptyTable": "Nessun circuito presente"
            }
        });
    });