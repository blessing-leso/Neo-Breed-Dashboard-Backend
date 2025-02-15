import { Employee } from "../models/Employees.js";
import bcrypt from "bcrypt";

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

  return newObj;
};

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

export const getAllEmployees = async (req, res, next) => {
  const employees = await Employee.find();
  res.status(200).json({
    status: "success",
    results: employees.length,
    data: {
      employees,
    },
  });
};

exports.deleteEmployee = catchAsync(async (req, res, next) => {
  await Employee.findByIdAndUpdate(req.newEmployee.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
