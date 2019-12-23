const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
    value: 'Number',
    type: 'String',
    date: 'Date',
    description: 'String'
});

mongoose.model('expenses', expenseSchema);