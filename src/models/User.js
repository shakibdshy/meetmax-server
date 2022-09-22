import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,        
    },
    username: {
        type: String,
        min: 3,
        max: 20,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,      
    },
    profilePicture: {
        type: String,
        default: "",        
    },
    coverPicture: {
        type: String,
        default: "",
    },
    birth: {
        type: String,
        default: "",
    },
    gander: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        max: 200,
    },
    city: {
        type: String,
        max: 50,
    },
    from: {
        type: String,
        max: 50,
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    },
}, {
    timestamps: true,
})

export default mongoose.model('User', UserSchema);