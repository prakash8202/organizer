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
	$('.search').click(function() { movie_search(document.getElementById('moviename').value); return false;});
} 

function movie_search(movie){
  $.get("/movie/search/"+movie, function(data){
    $("#searchList").html(data);
    //if movie title is clicked
    $('#selectmovie').click(function() { save_movie(this.name); return false;});
  });
}		

function save_movie(movieid){
  $.post('/movie/new', { 'movie[imdb_id]' : movieid}, function(data) {
    window.alert(data);
    onSearchClick();
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
}

function nav_list(alp){
  $.get("/movie/navlist/"+alp, function(data){
    $("#container").html(data);
    onMainPageRefresh();
  });
}

function view_movie(movieid){
  $.post('/movie/view', { 'movie[imdb_id]' : movieid}, function(data) {
   	  $("#rightframe").html(data);
  	});
}
