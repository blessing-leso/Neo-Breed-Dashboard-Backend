import mongoose from "mongoose"
const { Schema, Model} = mongoose

const LeadSchema = new Schema({
 fullname:{type: String, required: true},
 email: { type: String,required: true, unique: true },
 phone: { type: String, required: true },
 status: {type: String, enum: ['new', 'contacted', 'qualified', 'lost', 'converted'], default: 'new'},
 assignedTo:{type: Schema.Types.ObjectId, ref: 'Employee'}, //reference to employee
}, {timestamps: true})

module.exports = Model('Lead', LeadSchema)