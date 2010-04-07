get "/" do
  @movies = Movie.all(:title => /^[0-9]/)
  @movie = @movies.first()
  haml :index
end

get '/movie/mainlist' do
  @movies = Movie.all(:title => /^[0-9]/)
  @movie = @movies.first()
  haml :"movielist/mainlist", :layout => false
end

get '/movie/navlist/:alp' do
  alp = params[:alp]
  @movies = Movie.all(:title => /^[#{alp}]/)
  @movie = @movies.first()
  haml :"movielist/mainlist", :layout => false
end

get '/movie/new' do
  haml :"movielist/form", :layout => false
end

post '/movie/new' do
  movie_imdb_id = params[:movie][:imdb_id]
  @avail_movie = Movie.first(:imdb_id => movie_imdb_id.to_s)
  if @avail_movie == nil
    m = Imdb::Movie.new(movie_imdb_id)
    @movie = Movie.new(:imdb_id => m.id, :title => m.title, :url => m.url, :cast_members => m.cast_members, :director => m.director, :genres => m.genres, :languages => m.languages, :length => m.length, :rating => m.rating, :plot => m.plot, :tagline => m.tagline, :year => m.year)
    @movie.save!
    pp m.year 
    pp m.poster 
    dir_name = "public/images"
	d = Dir.mkdir(dir_name) unless File.directory?(dir_name)
    file_name = "#{m.id}.jpg"
    file_path = File.join dir_name, file_name
    image = File.new(file_path,'w')
    rio(file_path).binmode < rio(m.poster).binmode
    "Movie saved successfully"
  else
    "Movie already found in database"
  end
end

get '/movie/search/:moviename' do
  @movielist = Imdb::Search.new(params[:moviename]).movies
  #@movielist = @movielist[0..9]
  haml :"movielist/searchlist", :layout => false
end

post '/movie/view' do
  movie_imdb_id = params[:movie][:imdb_id]
  @movie = Movie.first(:imdb_id => movie_imdb_id.to_s)
  haml :"/layout/detailframe", :layout => false
end

