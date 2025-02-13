import Employee from '../models/employeeModel.js'
import bcrypt from 'bcrypt'

export const registerEmployee = async(req,res) => {
    const {Fullname, Email, Password, Phone, Address, JobTitle, Salary} = req.body

   const newEmployee = new Employee({
       fullname:  Fullname,
       email: Email,
       password: await bcrypt.hash(Password, 10),
       phone: Phone, 
       address: Address, 
       jobTitle: JobTitle,
       salary: Salary,
       role: 'employee',
       leads: [],
       clients: [] 
    })

    try {
        await newEmployee.save()
        res.status(201).json(newEmployee)

    } catch (error) {
        res.json({error: error.message})
    }
}