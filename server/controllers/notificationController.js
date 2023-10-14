const { Notification } = require('../models/index');
const { User } = require('../models/index');


// router.get('/notifications', notificationController.getAllNotifications);
// router.get('/notifications/:id', notificationController.getNotification);
// router.post('/notifications', notificationController.createNotification);
// router.put('/notifications/:id', notificationController.updateNotification);
// router.delete('/notifications/:id', notificationController.deleteNotification);
// const notificationSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     notification: String,
//     read: Boolean,
// }, { timestamps: true });


//@ROUTE: GET /api/notifications
//@DESC: Get all notifications
//@ACCESS: Public

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json({
            success: true,
            data: notifications,
            messsage: 'Successfully fetched all notifications'
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


//@ROUTE: GET /api/notifications/:id
//@DESC: Get a notification by id
//@ACCESS: Public

const getNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: notification,
            messsage: 'Successfully fetched notification'
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

//@ROUTE: POST /api/notifications
//@DESC: Create a notification
//@ACCESS: Public

const createNotification = async (req, res) => {
    const { body } = req;
    try {
        const notification = await Notification.create(body);
        res.status(201).json({
            success: true,
            data: notification,
            message: 'Successfully created notification'
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


//@ROUTE: PUT /api/notifications/:id
//@DESC: Update a notification
//@ACCESS: Public

const updateNotification = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const notification = await Notification.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            success: true,
            data: notification,
            message: 'Successfully updated notification'
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


//@ROUTE: DELETE /api/notifications/:id
//@DESC: Delete a notification
//@ACCESS: Public

const deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: notification,
            message: 'Successfully deleted notification'
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
    getAllNotifications,
    getNotification,
    createNotification,
    updateNotification,
    deleteNotification
}