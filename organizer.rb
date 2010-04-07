require 'rubygems'
require 'sinatra'
require 'pp'
require 'ftools'
require 'uri'
require 'haml'
require 'compass'
require 'mongo_mapper'
require 'imdb'
require 'rio'

require 'sinatra_more/markup_plugin'
Sinatra.register SinatraMore::MarkupPlugin

require 'app/models/movies'

MongoMapper.database="organizer"

require 'app/controllers/movielist'
