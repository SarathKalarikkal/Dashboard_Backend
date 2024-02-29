const Customer = require('../models/CustomerModel')
const mongoose = require('mongoose')

exports.homepage = async (req, res)=>{

    const messages = await req.flash('info');


    const locals = {
        title : "NodeJs",
        description : "User management system"
    }

    const perPage = 6; 

    const page = req.query.page || 1;
    const skip = perPage * page - perPage;

    try {
        const customers = await Customer.aggregate([{$sort : {updatedAt : -1}}])
            .skip(skip)
            .limit(perPage)
            .exec();

        const count = await Customer.countDocuments();
         
        res.render('index', {
            locals,
            customers,
            current: page,
            pages: Math.ceil(count / perPage), 
            messages
        });

    } catch (error) {
        console.log(error);
    }
}


exports.aboutpage = async (req, res)=>{

    const locals = {
        title : "About",
        description : "User management system"
    }


    res.render('about',locals);
}





exports.addCustomer = async(req, res)=>{
    const locals = {
        title : "Add new Customer",
        description : "User management system"
    }

    res.render('customer/add', locals)
}




//POST 
//Create a new customer
exports.postCustomer = async(req, res)=>{

    console.log(req.body);

    const {firstName, lastName, Phone, email, details } = req.body

    try {

        await Customer.create({
            firstName, lastName, Phone, email, details
        })
    
       await req.flash("info", "New customer is added")

        res.redirect('/')

    } catch (error) {
        console.log(error);
    }

}



exports.viewCustomer = async (req, res)=>{

    try {
        
      const customer = await Customer.findOne({_id : req.params.id})

      const locals = {
        title : "View Customer data",
        description : "User management system"
    }
    res.render('customer/view', {
        locals,
        customer
    })

    } catch (error) {
        console.log(error)
    }
}


exports.updateCustomer = async (req, res)=>{

    try {
        
      const customer = await Customer.findOne({_id : req.params.id})

      const locals = {
        title : "Edit Customer data",
        description : "User management system"
    }
    res.render('customer/edit', {
        locals,
        customer
    })

    } catch (error) {
        console.log(error)
    }
}

exports.editPost = async (req, res)=>{
const {
    firstName,lastName,Phone,email,details} = req.body
    try {
         await Customer.findByIdAndUpdate(req.params.id,{
            firstName,
            lastName,
            Phone,
            email,
            details,
            updatedAt : Date.now()
         })

         res.redirect(`/edit/${req.params.id}`)


    } catch (error) {
        console.log(error)
    }
}



exports.deleteCustomer = async (req, res)=>{
   try {
      await Customer.deleteOne({_id:req.params.id})
      res.redirect('/')
   } catch (error) {
    console.log(error);
   }
}


exports.searchCustomer = async (req, res)=>{
    const locals = {
        title : "search Customer data",
        description : "User management system"
    }
     
    try {
        let searchTerm = (req.body.searchTerm).replace(/[^a-zA-Z0-9 ]/g, "" )

        const customers = await Customer.find({
            $or: [
            { firstName: { $regex: new RegExp(searchTerm, "i") }},
            { lastName: { $regex: new RegExp(searchTerm, "i") }},
            ] })
            
            res.render('search',{
                locals,
                customers
            })

    } catch (error) {
        console.log(error);
    }

}