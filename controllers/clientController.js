import {Client} from '../models/Clients.js'
import {Employee} from '../models/Employees.js'
import sendEmail from "../utils/email.js";
import 'dotenv/config';

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

        const message = `You have been assigned a new client ${clientFullname}. Please login to your account to view the client details. The client requires ${client.serviceOffered} services.`;
                        
        await sendEmail(process.env.MY_REAL,"NEW CLIENT ALERT", message);

        res.status(200).json(`Client ${clientFullname} has been assigned to ${employeeFullname} `)
}
    catch (error) {
        res.json({error: error.message})
    }
}

export const unassignClient = async(req,res) => {
    const {clientFullname, employeeFullname} = req.body
    try {
        const client = await Client.findOne({fullname: clientFullname})
        if(!client) return res.status(404).json({message: 'Client not found'})
        const employee = await Employee.findOne({fullname: employeeFullname})
        if(!employee) return res.status(404).json({message: 'Employee not found'})

        client.assignedTo = null;
        await client.save()
        
        const clientId = client._id;
        
        // remove client from employee's clients array
        employee.clients = employee.clients.filter(clientObjId => !clientObjId.equals(clientId));
        
        await employee.save(); 
        res.status(200).json(`Client ${clientFullname} has been unassigned from ${employeeFullname} `)
    
}catch (error) {
    res.json({error: error.message})
}
}

export const deleteClient = async(req,res) => {
    const {Fullname} = req.body
    try {
        const client = await Client.findOneAndDelete({fullname: Fullname})
        if(!client) return res.status(404).json({message: 'Client not found'})
        res.status(200).json(`Client ${Fullname} has been deleted`)

}catch (error) {
    res.json({error: error.message})
}
}