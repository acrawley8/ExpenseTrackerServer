const mongoose = require('mongoose');
const { Schema } = mongoose;

const typeSchema = new Schema({
    name: 'String'
});

mongoose.model('types', typeSchema);