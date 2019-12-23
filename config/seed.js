const seeder = require('mongoose-seed');
const keys = require('./keys');

seeder.connect(keys.mongoURI, () => {
    seeder.loadModels([
        '../models/Config',
        '../models/Type'
    ]);

    seeder.clearModels([ 'configs', 'types' ], () => {
        seeder.populateModels(data, () => {
            seeder.disconnect();
        });
    });

});

var data = [
    {
        model: 'configs',
        documents: [
            {
                name: 'monthlyLimit',
                value: '1100'
            }
        ]
    },
    {
        model: 'types',
        documents: [
            { name: 'Hockey' },
            { name: 'Alchohol' },
            { name: 'Golf' },
            { name: 'Computer' },
            { name: 'PS4' },
            { name: 'Car' },
            { name: 'Deposit' },
            { name: 'Dinner' },
            { name: 'Food' },
            { name: 'Lunch' },
            { name: 'Personal' },
            { name: 'Other' },
            { name: 'Withdrawal' },
            { name: 'Gas' },
            { name: 'Last Month' },
            { name: 'Medical' }
        ]
    }
];