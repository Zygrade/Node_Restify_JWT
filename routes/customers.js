const errors = require('restify-errors');
const Customer = require('../model/Customer');

module.exports = server => {

    // GET
    server.get('/customers', async (req,res,next) => {
        try {
            // res.send({msg : 'testing'});
            const customers = await Customer.find({});
            res.send(customers)
            next();
        } catch(err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    // GET_ONE
    server.get('/customers/:id', async (req,res,next) => {
        try {
            // res.send({msg : 'testing'});
            const customer = await Customer.findById(req.params.id);
            res.send(customer)
            next();
        } catch(err) {
            return next(new errors.ResourceNotFoundError(`No Customer with id as ${req.params.id} found`));
        }
    });

    // POST
    server.post('/customers', async (req,res,next) => {

        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expected 'application/json'"));
        }

        const customer = new Customer({
            name : req.body.name,
            email : req.body.email,
            balance : req.body.balance 
        });

        try {
            const newCustomer = await customer.save();
            res.send(201);
            next();
        } catch(err) {
            return next(new errors.InternalError(err.message));
        }
    });

    //PUT
    server.put('/customers/:id', async (req,res,next) => {
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expected 'application/json'"));
        }

        try{
            const customer = await Customer.findOneAndUpdate({_id : req.params.id}, req.body);
            res.send(customer);
            next();
        } catch(err) {
            return next(new errors.ResourceNotFoundError(`No Customer with id as ${req.params.id} found`));
        }
    });

    // DELETE
    server.del('/customers/:id', async (req,res,next) => {
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expected 'apllication/json'"));
        }

        try {
            await Customer.deleteOne({_id : req.params.id});
            res.send(201);
            next(); 
        } catch(err) {
            return next(new errors.ResourceNotFoundError(`No Customer with id as ${req.params.id} found`));
        }
    });

}
