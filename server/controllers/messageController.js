const { Message } = require('../models/index');

// //Message routes
// router.get('/messages', messageController.getAllMessages);
// router.get('/messages/:id', messageController.getMessage);
// router.post('/messages', messageController.createMessage);
// router.put('/messages/:id', messageController.updateMessage);
// router.delete('/messages/:id', messageController.deleteMessage);


// Get all messages
exports.getAllMessages = (req, res) => {
    Message.find()
        .then((messages) => {
            res.status(200).json({
                success: true,
                data: messages,
                message: 'Successfully fetched all messages'
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

// Get a message
exports.getMessage = (req, res) => {
    Message.find({ creator: req.params.id })
        .then((message) => {
            res.status(200).json({
                success: true,
                data: message[0],
                message: 'Successfully fetched message'
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};


// Create a message
exports.createMessage = (req, res) => {
    const { body } = req.body

    console.log(body);

    Message.create({ messages: body.messages, creator: body.creator })
        .then((message) => {
            res.status(201).json({
                success: true,
                data: message,
                message: 'Successfully created message'
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

// Update a message
exports.updateMessage = (req, res) => {
    const { body } = req.body
    console.log(body);
    Message.findByIdAndUpdate(req.params.id, body)
        .then((message) => {
            res.status(200).json({
                success: true,
                data: message,
                message: 'Successfully updated message'
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

// Delete a message
exports.deleteMessage = (req, res) => {
    Message.findByIdAndDelete(req.params.id)
        .then((message) => {
            res.status(200).json({
                success: true,
                data: message,
                message: 'Successfully deleted message'
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

