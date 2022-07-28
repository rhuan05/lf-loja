const mongoose = require('mongoose');

const FileiraSchema = new mongoose.Schema({
    titulo: String,
});

const FileiraModel = mongoose.model('Fileira', FileiraSchema);

module.exports = FileiraModel;