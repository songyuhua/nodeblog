var mongoose = require('mongoose')
var MovieSchema = require('../schemas/movieee')
var Fat = mongoose.model('Movie',MovieSchema)

module.exports  = Fat 