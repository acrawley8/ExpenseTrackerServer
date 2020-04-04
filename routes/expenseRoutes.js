const mongoose = require('mongoose');

const Expense = mongoose.model('expenses');
const Config = mongoose.model('configs');

module.exports = (app) => {
    app.get('/api/expense/:month/:year', async (request, response) => {
        const { month, year } = request.params;
		const { sortBy, type } = request.query;

        var results = {};
        if(month && year){
            const startDate = new Date(year, month-1, 1);
            const endDate = new Date(year, month, 1);

			var sort = { date: 'ascending' };

			switch(sortBy) {
				case "date desc":
					sort = { date: 'descending' };
					break;
				case "value asc":
					sort = { value: 'ascending' };
					break;
				case "value desc":
					sort = { value: 'descending' };
					break;
			}

            results.expenses = await Expense.find({ date: { "$gte": startDate, "$lt": endDate }}).sort(sort);
        }

        response.status(200).send(results);
    });

    app.put('/api/expense', async (request, response) => {
        const { value, type, date, description } = request.body;

        const expense = new Expense({
            value, type, date, description
        });

        try{
            await expense.save();
        } catch(error) {
            response.status(500).send([{
                errorMessage: error
            }]);
            return;
        }

        response.status(200).send({});
    });

    app.post('/api/expense/:id', async (request, response) => {
        const { id } = request.params;
        const { value, type, date, description } = request.body;

        const expense = {
            value, type, date, description
        };

        try {
            await Expense.updateOne({
                _id: id
            }, {
                $set: expense
            });
        } catch(error) {
            response.status(500).send([{
                errorMessage: error
            }]);
            return;
        }

        response.status(200).send({ });
    });

    app.delete('/api/expense/:id', async (request, response) => {
        const { id } = request.params;

        try {
            await Expense.deleteOne({ _id: id });
        } catch(error) {
            response.status(500).send([{
                errorMessage: error
            }]);
            return;
        }

        response.status(200).send({ });
    });

    app.get('/api/expense/totals/:month/:year', async (request, response) => {
        const { month, year } = request.params;

        if(month && year){
            const startDate = new Date(year, month-1, 1);
            const endDate = new Date(year, month, 1);
            var totalExpenses = -1;
            var totalRemaining = -1;

            try {
                const dbLookupResult = await Expense.aggregate([
                    {
                        $match: {
                            date: { "$gte": startDate, "$lt": endDate }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            value: { $sum: "$value" }
                        }
                    }
                ]);

                if(dbLookupResult[0]) {
                    totalExpenses = dbLookupResult[0].value;
                } else {
                    totalExpenses = 0;
                }

                const { value: monthlyLimit } = await Config.findOne({ name: 'monthlyLimit' });
                totalRemaining = monthlyLimit - totalExpenses;

            } catch(error) {
                response.status(500).send({
                    errorMessage: error
                });
                return;
            }
        }

        response.status(200).send({
            total: totalExpenses,
            remaining: totalRemaining
        });
    });

    app.get('/api/expense/aggregate/:month/:year', async(request, response) => {
      const { month, year } = request.params;

      if(month && year) {
        const startDate = new Date(year, month-1, 1);
        const endDate = new Date(year, month, 1);

        try {
          const dbLookupResult = await Expense.aggregate([
            {
              $match: {
                date: { "$gte": startDate, "$lt": endDate }
              }
            },
            {
              $group: {
                _id: '$type',
                total: { $sum: '$value' }
              }
            },
            {
              $sort: {
                total: -1
              }
            }
          ]);

          response.status(200).send(dbLookupResult);
        } catch(error) {
          console.log(error);
          response.status(500).send({
            errorMessage: error
          });
          return;
        }
      }
    });
}
