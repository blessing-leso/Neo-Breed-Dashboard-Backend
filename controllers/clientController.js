import e from 'express'
import {Client} from '../models/Clients.js'
import {Employee} from '../models/Employees.js'

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

export const getClients = async(req,res) => {
    try {
        const clients = await Client.find()
        res.status(200).json(clients)

    } catch (error) {
        res.json({error: error.message})
    }
}

 export const getClient = async(req,res) => {
    const {Fullname} = req.body
    try {
        const client = await Client.findOne({fullname: Fullname})
        .populate('assignedTo', 'fullname email -_id')
        .exec()
        if(!client) return res.status(404).json({message: 'Client not found'})
        res.status(200).json(client)

    } catch (error) {
        res.json({error: error.message})

    }
}
export const assignClient = async(req,res) => {
    const {clientFullname, employeeFullname} = req.body
    try {
        const client = await Client.findOne({fullname: clientFullname})
        if(!client) return res.status(404).json({message: 'Client not found'})
        const employee = await Employee.findOne({fullname: employeeFullname})
        if(!employee) return res.status(404).json({message: 'Employee not found'})
        client.assignedTo = employee._id
        employee.clients.push(client._id)
        await client.save()
        await employee.save()
        res.status(200).json(`Client ${clientFullname} has been assigned to ${employeeFullname} `)
}
    catch (error) {
        res.json({error: error.message})
    }
}