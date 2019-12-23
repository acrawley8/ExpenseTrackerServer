const mongoose = require('mongoose');
const { Schema } = mongoose;

const configSchema = new Schema({
    name: 'String',
    value: 'String'
});

mongoose.model('configs', configSchema)