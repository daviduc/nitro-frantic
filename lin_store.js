var observer_handle;
var local_store;
var local_results;
var def_store;
var user_id;

function initialize_store(mem_class) {
    //perform some initialization of new Memory instance
    //before passing to store_ready
    //make result sets from queries observable
    require(['dojo/store/Observable'], function(obs) { 
	def_store = new obs(new mem_class());
	
	store_ready(def_store);
    });
};

try {
    require(['dojo/store/Memory'],initialize_store);
} catch(err) {console.log(err)};


function store_ready(store) {
    console.log('store is ' + typeof store);
    local_store=store;
    local_store.put({id:'login',title:'<script type="in/Login">Hello, <?js=firstName ?> <?js=lastName ?>  </script>',description:user_id});
    local_store.put({id:'tagline',title:'tag line',description:'NA'});
    local_store.put({id:'industry',title:'industry',description:'NA'});
    local_store.put({id:'positions',title:'positions',description:'NA'});
    
    //console.log('in store_ready local_store = ' + local_store.get('dynamic').value);
    //store.query returns an array
    //local_results=local_store.query({com:7},{sort:[{attributes:'id'}]});
    //console.log('local_results is ' + typeof local_results);
    //observer_handle = local_results.observe(store_observer,true);

};

function store_observer(object, removedFrom, insertedInto) {
    console.log('changed object id is ' + object.id);
    console.log('removedFrom is ' + removedFrom);
    console.log('insertedInto is ' + insertedInto);

};


