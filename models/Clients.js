import mongoose from "mongoose"
const { Schema, Model} = mongoose

const clientSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String,required: true, unique: true },
    phone: { type: String, required: true },
    company: { type: String,required: true},
    serviceOffered: [{type: String}],
    status: {type: String, enum: ['new','lost','old','converted'], default: 'new'},
    assignedTo:{type: Schema.Types.ObjectId, ref: 'Employee'}, //reference to employee
}, { timestamps: true })

module.exports = Model('Client', clientSchema)