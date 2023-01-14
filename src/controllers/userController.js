const userModel = require("../modules/userModel")
const mongoose = require('mongoose')

const createUser = async (req, res) => {
    try{
        let data = req.body;
    
        let {name, email, role, department} = data;

        if (!Object.keys(data).length) {
            return res.status(400).send({ status: false, message: "Add User Details For Registration.." });
        }

        if (!name)return res.status(400).send({ status: false, message: "Please enter the first name" });

        if (!(/^[A-Za-z]+$/i.test(name))) return res.status(400).send({status: false,message: "Please enter valid name and should be character only"});
    
        if (!email) return res.status(400).send({ status: false, message: "Please enter the email" });

        if (!(/^[a-z0-9]{1,}@g(oogle)?mail\.com$/.test(email))) return res.status(400).send({ status: false, message: "Please provide valid email..."});

        if (!role)return res.status(400).send({ status: false, message: "Please enter the User Role" });
    
        if (!department) return res.status(400).send({ status: false, message: "Please enter the department" });
        
        if(!["Research", "Development", "Production", "Testing" ,"Sales" ,"Marketing"].includes(department)) return res.status(400).send({status:false, message:'Enter valid Department'})    

        let checkEmail = await userModel.findOne({ email});
        if (checkEmail) return res.status(400).send({ status: false, message: "email is already exist" });

        let userData = await userModel.create(data)
        return res.status(201).send({ status: true, message: "User Created Successfully", data: userData});
    } catch(error) {
        res.status(500).send({ status: false, error: error.message });
    }
}

const filterByDepartment = async (req, res)=> {
    try{
        let department = req.query.department
        
        if (!department) return res.status(400).send({ status: false, message: "Please enter the department" });

        let data = await userModel.find({department: department}).sort({"name": 1})
        if(data.length === 0) return res.status(404).send({ status: false, message: "No Data Found.."})

        return res.status(200).send({ status: true, message: "User Details By Department..", data: data});
    } catch(error) {
        res.status(500).send({ status: false, error: error.message });
    }
}

const getUserContact = async (req, res) => {
    try{
        let userId = req.params.userId
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({ status: false, message: "Please enter valid User Id" });

        let data = await userModel.find({_id: {$ne: userId}})
        
        return res.status(200).send({ status: true, message: "User Details By Department..", data: data});
    } catch(error) {
        res.status(500).send({ status: false, error: error.message });
    }
}

const getContactByFilter = async (req, res) => {
    try{
        let data = req.query
        let {name, email, role} = data
        let query= {}
        if(name){
            if (!(/^[A-Za-z]+$/i.test(name))) return res.status(400).send({status: false,message: "Please enter valid name and should be character only"});
            query.name = name
        }
        if(email){
            if (!(/^[a-z0-9]{1,}@g(oogle)?mail\.com$/.test(email))) return res.status(400).send({ status: false, message: "Please provide valid email..."});
            query.email = email
        }
        if(role){
            if (!role) return res.status(400).send({ status: false, message: "Please provide Role..."});
            query.role = role
        }

        let result = await userModel.find(query)
        return res.status(200).send({ status: true, message: "User Details By Department..", data: result});
    } catch(error) {
        res.status(500).send({ status: false, error: error.message });
    }
}

module.exports = {createUser, filterByDepartment, getUserContact, getContactByFilter}