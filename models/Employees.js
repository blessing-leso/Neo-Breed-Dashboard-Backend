import mongoose from "mongoose"
const { Schema, model} = mongoose

const employeeSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String,required: true, unique: true },
    password: {type: String, required: true},
    phone: { type: String, required: true },
    address: { type: String,required: true},
    jobTitle: {type: String, required: true},
    role:{type: String, enum: ['admin', 'employee'], default: 'employee'}, //use this for role based access
    salary: { type: Number, required: true},
    leads:[{type: Schema.Types.ObjectId, ref: 'Lead'}], //reference to leads
    clients:[{type: Schema.Types.ObjectId, ref: 'Client'}] //reference to clients

}, { timestamps: true })

export const Employee = model('Employee', employeeSchema)