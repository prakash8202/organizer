$(document).ready(function() {   
 
  //if add button is clicked
  $('.addmovie').click(function() { add_movie(); return false;});
  onMainPageRefresh();
});

function add_movie(){
  $.get("/movie/new", function(data){
    $("#container").html(data);
    //if search button is clicked
    onSearchClick();
    //if back button is clicked
    $('.back').click(function() { show_mainlist(); return false;});
  });
}

function onSearchClick(){
	$('.search').click(function() {
      $("#searchList").html("<html><body><center><img src='/images/preload.gif'/><br/><br/>Fetching movies..</center></body></html>");
	  var movie = document.getElementById('moviename').value;
      $.get("/movie/search/"+movie, function(data){
        $("#searchList").html(data);
        //if movie title is clicked
        onSelectMovieClick();
      });
 
      return false;
    });
} 

function onSelectMovieClick(){
  $('.selectmovie').click(function() {
    var value = this.name;
    var movieid = value.split(",")[0];
    var year = value.split(",")[1];
    $.post('/movie/new', { 'movie[imdb_id]' : movieid, 'year' : year}, function(data) {
      window.alert(data);
      onSearchClick();
    });
    
    return false;
  });
}		

function show_mainlist(){
  $.get("/movie/mainlist", function(data){
    $("#container").html(data);
    onMainPageRefresh();
  });
}

function onMainPageRefresh(){
  $('.movie_link').click(function() { nav_list(this.text); return false;});
  $('.viewmovie').click(function() { view_movie(this.name); return false;});
  onUpdatePosterClick();
}

function nav_list(alp){
  $.get("/movie/navlist/"+alp, function(data){
    $("#container").html(data);
    onUpdatePosterClick();
  });
}

function view_movie(movieid){
  $.post('/movie/view', { 'movie[imdb_id]' : movieid}, function(data) {
   	$("#rightframe").html(data);
    onUpdatePosterClick();
  });
}

function onUpdatePosterClick(){
  new AjaxUpload('#updateposter', {
			action: "/movie/updateposter",
			type: "post",
			name: "poster",
		onSubmit : function(file , ext){
			//if (ext && new RegExp('^(' + allowed.join('|') + ')$').test(ext)){
			if (ext && /^(jpg|png|jpeg|gif)$/.test(ext)){
				
				/* Setting data */
				this.setData({
					'movieid': document.getElementById('updateposter').name
				});
				$('div.preview').html("loading...");				
			} else {
				
				// extension is not allowed
				$('div.preview').html('Error: only images are allowed');
				// cancel upload
				return false;				
			}
	
		},
		onComplete : function(file, response){
			window.alert(file);
			$('div.preview').html('');
			$("#rightframe").html(response);		
		}		
	});	
}
