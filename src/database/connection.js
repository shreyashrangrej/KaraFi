const mongoose = require('mongoose');

const db = require('../authentication/models')

const Role = db.role

let url = process.env.DATABASE_URL

mongoose.connect(url, {
}).then(() => {
    console.log('Database Connection Successful!')
    initial();
}).catch((e) => {
    console.log(`Database connection failed: ${e}`)
    process.exit()
})

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                roleName: 'user'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }
                console.log("Added 'user' to roles collection.");
            });
            new Role({
                roleName: 'moderator'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }
                console.log("Added 'moderator' to roles collection.");
            });
            new Role({
                roleName: 'admin'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }
                console.log("Added 'admin' to roles collection.");
            });
        }
    });
}
