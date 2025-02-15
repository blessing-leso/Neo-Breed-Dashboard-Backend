import {Employee} from '../models/Employees.js'
import {Lead} from '../models/Leads.js'
import bcrypt from 'bcrypt'

export const registerEmployee = async(req,res) => {
    const {Fullname, Email, Password, Phone, Address, JobTitle} = req.body

   const newEmployee = new Employee({
       fullname:  Fullname,
       email: Email,
       password: await bcrypt.hash(Password, 10),
       phone: Phone, 
       address: Address, 
       jobTitle: JobTitle,
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

export const registerLead = async(req,res) => {
    const {Fullname,Email,Phone, InterestedIn} = req.body

    try {
        const newLead = new Lead({
            fullname: Fullname,
            email: Email,
            phone: Phone,
            interestedIn: InterestedIn
        })
        await newLead.save()
        res.status(201).json(newLead)
        
    } catch (error) {
        res.json({error: error.message})
    }
}

export const registerClient = async(req,res) => { 
    const {Fullname, Email, Phone, Company, ServiceOffered} = req.body

    try {
        const newClient = new Client({
            fullname: Fullname,
            email: Email,
            phone: Phone,
            company: Company,
            serviceOffered: ServiceOffered
        })
        await newClient.save()
        res.status(201).json(newClient)

    } catch (error) {
        res.json({error: error.message})
    }
}