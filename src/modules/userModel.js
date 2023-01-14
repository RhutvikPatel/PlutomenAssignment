const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: ["Research", "Development", "Production", "Testing" ,"Sales" ,"Marketing"]
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)