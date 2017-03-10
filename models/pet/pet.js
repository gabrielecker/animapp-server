const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: name = > name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        require: [true, 'Name is required.']
    },
    type: String,
    castrated: Boolean,
    dewormed: Boolean
});