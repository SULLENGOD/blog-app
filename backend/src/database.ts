import mongoose, { mongo } from "mongoose";

mongoose.connect('mongodb://0.0.0.0:27017/RN-Test', {})
    .then(db => console.log({
        "Database": "RN-Test",
        "Status": "Online"
    }))
    .catch(err => console.log(err));
    
    