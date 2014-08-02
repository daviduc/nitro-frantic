require([
        //Require resources.
        "dojo/store/Memory",
        "gridx/core/model/cache/Sync",
        "gridx/Grid"
    ], function(Memory, Cache, Grid){
     
	var structure = [
            { field: 'connection_name', name: 'Name',         width:'200px'},
	    { field: 'distance',        name: 'Conn. Lvl',    width: '60px'},
	    { field: 'area',            name: 'General Area', width:'200px'},
	    { field: 'business',        name: 'Industry',     width:'200px'},
	    { field: 'num_connects',    name: 'Num. Conn.',   width: '60px'},
            { field: 'positions',       name: 'Positions',    width: 'auto'}
	];

        //Create grid widget.
        var grid = Grid({
            id: 'sales_grid',
            cacheClass: Cache,
            store: local_store,
            structure: structure
        });

        grid.placeAt('sales');
	
        //Start it up.
        grid.startup();
    }
);


