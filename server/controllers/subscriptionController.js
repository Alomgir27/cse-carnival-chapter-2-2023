const { Subscription } = require('../models/index');
const { User } = require('../models/index');


// router.get('/subscriptions', subscriptionController.getAllSubscriptions);
// router.get('/subscriptions/:id', subscriptionController.getSubscription);
// router.post('/subscriptions', subscriptionController.createSubscription);
// router.put('/subscriptions/:id', subscriptionController.updateSubscription);
// router.delete('/subscriptions/:id', subscriptionController.deleteSubscription);
// const subscriptionSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     subscription: {
//         type: String,
//         enum: ['free', 'basic', 'premium'],
//         default: 'free',
//     },
//     expiryDate: Date,
//     payment: {
//         amount: Number,
//         paymentMethod: String,
//         paymentDate: Date,
//     },
// }, { timestamps: true });


//@ROUTE: GET /api/subscriptions
//@DESC: Get all subscriptions
//@ACCESS: Public

const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({
            success: true,
            data: subscriptions,
            messsage: 'Successfully fetched all subscriptions'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }
}


//@ROUTE: GET /api/subscriptions/:id
//@DESC: Get a subscription by id
//@ACCESS: Public

const getSubscription = async (req, res) => {
    const { id } = req.params;

    try {
        const subscription = await Subscription.findById(id);
        res.status(200).json({
            success: true,
            data: subscription,
            messsage: 'Successfully fetched subscription'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }

}


//@ROUTE: POST /api/subscriptions
//@DESC: Create a new subscription
//@ACCESS: Public

const createSubscription = async (req, res) => {
    const { body } = req;
    try {
        const subscription = await Subscription.create(body);
        res.status(200).json({
            success: true,
            data: subscription,
            messsage: 'Successfully created subscription'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message,
        });
    }
}


//@ROUTE: PUT /api/subscriptions/:id
//@DESC: Update a subscription
//@ACCESS: Public

const updateSubscription = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const subscription = await Subscription.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            success: true,
            data: subscription,
            messsage: 'Successfully updated subscription'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });

    }
}


//@ROUTE: DELETE /api/subscriptions/:id
//@DESC: Delete a subscription
//@ACCESS: Public

const deleteSubscription = async (req, res) => {
    const { id } = req.params;

    try {
        const subscription = await Subscription.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: subscription,
            messsage: 'Successfully deleted subscription'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }

}

module.exports = {
    getAllSubscriptions,
    getSubscription,
    createSubscription,
    updateSubscription,
    deleteSubscription,
}