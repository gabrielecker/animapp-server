const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    name: String,
    type: String,
    size: String,
    sex: String,
    castrated: Boolean,
    dewormed: Boolean,
    pictures: Array,
    information: String
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;