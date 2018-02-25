const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let UserSchema = new Schema({
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    username: String,
    displayName: String,
    photo: String,
    twitterProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    }
});

UserSchema.set('toJSON', {getters: true, virtuals: true});

UserSchema.statics.upsertTwitterUser = function (token, tokenSecret, profile, cb) {
    let that = this;
    return this.findOne({
        'twitterProvider.id': profile.id
    }, (err, user) => {
        // no user was found, lets create a new one
        if (!user) {
            let newUser = new that({
                email: profile.emails[0].value,
                username: profile.username,
                displayName: profile.displayName,
                photo: profile.photos[0].value,
                twitterProvider: {
                    id: profile.id,
                    token: token,
                    tokenSecret: tokenSecret
                }
            });

            newUser.save(function (error, savedUser) {
                if (error) {
                    console.log(error);
                    return cb(error, savedUser);
                }
                return cb(null, savedUser);
            });
        } else {
            if (err) {
                console.log(err);
                return cb(err);
            }
            return cb(null, user);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);

