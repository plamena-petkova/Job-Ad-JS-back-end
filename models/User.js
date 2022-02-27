const {Schema, model, Types: {ObjectId}} = require('mongoose');

const EMAIL_PATTERN = /([a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+)/

const userSchema = new Schema({
    email: {type: String, required: true, valiadate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email must be valid formats'
        }},
    hashedPassword : { type: String, required: true, minlength:[5, 'Password should be at least 5 charachters long']},
    description: {type: String, required: true, maxlength:[40, 'Description should be maximum 40 charachters long']},
    ads: {type: [ObjectId], ref: 'Job', default: []}
});

userSchema.index({email: 1}, { 
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;

