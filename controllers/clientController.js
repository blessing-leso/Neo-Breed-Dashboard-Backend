import {Client} from '../models/Clients.js'

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
