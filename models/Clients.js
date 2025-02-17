import mongoose from "mongoose"
const { Schema, model} = mongoose

const clientSchema = new Schema({
    fullname: { type: String, required: true, unique: true },
    email: { type: String,required: true, unique: true },
    phone: { type: String, required: true },
    company: { type: String,required: true},
    serviceOffered: [String],
    status: {type: String, enum: ['new','lost','old','converted'], default: 'new'},
    assignedTo:{type: Schema.Types.ObjectId, ref: 'Employee'}, //reference to employee
}, { timestamps: true })

export const Client = model('Client', clientSchema)