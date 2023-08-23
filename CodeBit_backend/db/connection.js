const mongoose = require('mongoose');

const db = process.env.DATABASE

mongoose.set("strictQuery", false);
mongoose.connect(db)
    .then((data) => { 
        return 1;
    })
    .catch((err) => {
        console.log("Mongodb connection err --> " + err)
    }) 
