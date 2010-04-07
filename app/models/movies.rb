class Movie
  include MongoMapper::Document

  key :imdb_id
  key :title
  key :url
  key :cast_members
  key :director
  key :genres
  key :languages
  key :length
  key :rating
  key :plot
  key :tagline
  key :year
end
