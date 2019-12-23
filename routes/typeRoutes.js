const mongoose = require('mongoose');

const Type = mongoose.model('types');

module.exports = (app) => {
    app.get('/api/types', async (request, response) => {
        results = await Type.find({}).select('name -_id').sort({ name: 'ascending' });
        response.status(200).send(results);
    });

    app.put('/api/types', async (request, response) => {
        const { name } = request.body;

        const type = new Type(request.body);
        try {
            await type.save();
        } catch(error) {
            response.status(500).send({ 
                errorMessage: error 
            });
            return;
        }

        response.status(200).send({});
    });
}