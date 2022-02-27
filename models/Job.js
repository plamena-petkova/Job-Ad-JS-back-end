const {Schema, model, Types: {ObjectId}} = require('mongoose');


const jobSchema = new Schema({
    headline: {type: String, required: true, minlength: [4, 'Headline should be at least 4 charachters long']},
    location : { type: String, required: true, minlength: [8, 'Location should be at least 8 charachters long']},
    companyName: {type: String, required: true, minlength: [3, 'Company name should be at least 3 charachters long']},
    companyDescription: {type: String, required: true, maxlength: [40, 'Description should be at least 40 charachters long']},
    owner: {type: ObjectId, ref: 'User'},
    users: {type: [ObjectId], ref: 'User', default: []}
}, {
    timestamps:true
});


const Job = model('Job', jobSchema);

module.exports = Job;