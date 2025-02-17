import {Lead} from '../models/Leads.js'

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

export const getLeads = async(req,res) => {
    try {
        const leads = await Lead.find()
        res.status(200).json(leads)

    } catch (error) {
        res.json({error: error.message})
    }
}

