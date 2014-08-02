var local_connections;
var member;

var arr_connection_fields = ['first-name',              'last-name',        'positions',       'location:(name)',
			     'industry',                'distance',         'num-connections', 'email-address',
			     'associations',            'interests',        'publications',    'patents','skills',
			     'certifications',          'educations',       'courses',         'volunteer',
			     'recommendations-received','job-bookmarks',    'following',       'phone-numbers',
			     'main-address',            'group-memberships','num-recommenders','id',
			     'headline'];
var arr_profile_fields=arr_connection_fields;
function onLoadProfile() {
    IN.Event.on(IN, "auth",onLinkedAuth);
};

function onLinkedAuth() {
    console.log("linkedin authorized");
    IN.API.Profile("me").fields(arr_profile_fields).result(showProfile).error(errorProfiles);
    IN.API.Connections("me").fields(arr_connection_fields).params({"start":0,"count":500}).result(showConnections).error(errorConnections);
};


function showProfile(profiles) {
    member = profiles.values[0];
   // $('<p id=\"' + member.id + '\">' + member.headline  + ' ' + member.industry +  '</p>').appendTo("#jobs_profile_data");
    user_id = member.id;
    var positions = new Array();
    var position_string='';
    if(typeof member.positions != 'undefined') {
	positions =typeof member.positions.values != 'undefined' ? member.positions.values: 0;
	if(positions != 0) {
	    positions.forEach(function(pos,index) { 
		end=typeof pos.endDate != 'undefined' ? pos.endDate.month+"/"+pos.endDate.year : "present";
		start=typeof pos.startDate != 'undefined' ? pos.startDate.month+"/"+pos.startDate.year: "unknown";
		position_string = position_string+ pos.company.name+' : '+ pos.title+ ' : ' + start + " to " + end +'<br>';
	    });
	}
    } 
    //member.positions.forEach(function(pos) { 
    local_store.put({id:"tagline",title:"tag line",description:member.headline});
    local_store.put({id:"login",title:member.firstName +' '+ member.lastName, description:user_id});
    local_store.put({id:"industry",title:"industry",description:member.industry});
    local_store.put({id:"positions",title:positions.length>1 ? 'positions' : 'position', description:position_string});
};

function errorProfiles(error) {
    console.log(error);
};

function showConnections(connections) {
    local_connections=connections;
    var positions = new Array();
    var location,cdistance,numconnects,industry;
    var position_string='';
    //IN.API.Profile("me").fields("last-name","first-name","positions").result(function(profile) { console.log(profile.values[0].positions.values[0].title); })
    connections.values.forEach(function(conn,index) {
	// start positions
	if(typeof conn.positions != 'undefined') {
    	    positions =typeof conn.positions.values != 'undefined' ? conn.positions.values: 0;
	    if(positions != 0) {
		//$('<p>'+conn.firstName + ' ' + conn.lastName + ' ' + '</p>').appendTo("#sales");
		positions.forEach(function(pos) { 
		    end=typeof pos.endDate != 'undefined' ? pos.endDate.month+"/"+pos.endDate.year : "present";
		    start=typeof pos.startDate != 'undefined' ? pos.startDate.month+"/"+pos.startDate.year: "unknown";
		   // $('<p id=p2nd>'+pos.company.name+' : '+ pos.title+ ' : ' + start + " to " + end+ '</p>').appendTo("#sales");
		    position_string = position_string+ pos.company.name+' : '+ pos.title+ ' : ' + start + " to " + end +'<br>';
		});
		//$('<br>').appendTo("#sales");

	    }
	}
	// end positions

	// start location
	if(typeof conn.location != 'undefined') {location= conn.location.name;} else location = 'NA';

	// start distance
	if(typeof conn.distance != 'undefined') {conn.distance>1 ? cdistance ='other' : cdistance='1st level';} else cdistance = 'NA';

	// start num connections
	if(typeof conn.numConnections != 'undefined') { numconnects=conn.numConnections;} else numconnects=0;

	// start industry
	if(typeof conn.industry != 'undefined') { industry=conn.industry;} else industry='NA';

	local_store.put({id:'connection_'+index,
			 title:'connection',
			 connection_name:conn.firstName+ ' ' + conn.lastName,
			 distance:cdistance,
			 area:location,
			 business:industry,
			 num_connects:numconnects,
			 positions:position_string});
	position_string='';
    });
	
    $('<script type="text/javascript" src="lin_gridx.js"></script>').appendTo("#sales");
    $('#sales_grid').css({"min-width":"1em","min-height":"1em","width":"100%","height":"100%"}); 
};

function errorConnections(error) {
    console.log(error);
};
