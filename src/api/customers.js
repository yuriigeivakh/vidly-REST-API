const express = require('express');

const customerControllers = require('../controllers/customers');

const router = express.Router();

router.get('/', customerControllers.getCustomers);

router.post('/', customerControllers.addCustomer);

router.put('/:id', customerControllers.updateCustomer);

router.delete('/:id', customerControllers.deleteCustomer);

router.get('/:id', customerControllers.getCustomerById);

module.exports = router; 