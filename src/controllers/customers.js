const {Customer, validate} = require('../models/customer'); 

const getCustomers = async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
}

const getCustomerById = async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
}

const addCustomer = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({ 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();
    
    res.send(customer);
}

const updateCustomer = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        { 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
        }, { new: true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    
    res.send(customer);
}

const deleteCustomer = async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
}

exports.getCustomers = getCustomers;
exports.getCustomerById = getCustomerById;
exports.addCustomer = addCustomer;
exports.updateCustomer = updateCustomer;
exports.deleteCustomer = deleteCustomer;