<<<<<<< HEAD
import { Employee } from "../models/Employees.js";
import bcrypt from "bcrypt";
import { CatchAsync } from "../utils/CatchAsync.js";

export const registerEmployee = async (req, res) => {
  const { Fullname, Email, Password, Phone, Address, JobTitle, Salary } =
    req.body;

  const newEmployee = new Employee({
    fullname: Fullname,
    email: Email,
    password: await bcrypt.hash(Password, 10),
    phone: Phone,
    address: Address,
    jobTitle: JobTitle,
    salary: Salary,
    role: "employee",
    leads: [],
    clients: [],
  });
=======
import {Employee} from '../models/Employees.js'
import {Lead} from '../models/Leads.js'
import {Client} from '../models/Clients.js'
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
>>>>>>> b1ea6234fb9a9facd60f03859ef07505199fe45c

  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.json({ error: error.message });
  }
};

//Filter Out the field an employeee can't update
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

<<<<<<< HEAD
  return newObj;
};

/** ApI to update the users/employeee details */
export const updateEmployee = async (req, res) => {
  const filterBody = filterObj(
    req.body,
    "fullname",
    "phone",
    "address",
    "jobTitle"
  );

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      filterBody,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.json({ error: error.message });
  }
};

/**  ApI to delete  the user/employeee from database */
export const deleteEmployee = async (req, res, next) => {
  try {
    await Employee.findByIdAndDelete(req.params.id, { active: false });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getEmployee = CatchAsync(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return next(res.status(404).json({ error: "Employee not found" }));
  }

  res.status(200).json({
    data: {
      employee,
    },
  });
});

export const getMe = (req, res, next) => {
  if (!req.employee.id) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    data: {
      employee: req.employee,
    },
  });
};
=======
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

export const getAllEmployees = async(req,res) => {
    try {
        const employees = await Employee.find()
        res.status(200).json(employees)

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

export const getClients = async(req,res) => {
    try {
        const clients = await Client.find()
        res.status(200).json(clients)

    } catch (error) {
        res.json({error: error.message})
    }
}
>>>>>>> b1ea6234fb9a9facd60f03859ef07505199fe45c
