const { Appointment } = require('../models/index');
const { User } = require('../models/index');


// // Appointment routes
// router.get('/appointments', appointmentController.getAllAppointments);
// router.get('/appointments/:id', appointmentController.getAppointment);
// router.post('/appointments', appointmentController.createAppointment);
// router.put('/appointments/:id', appointmentController.updateAppointment);
// router.delete('/appointments/:id', appointmentController.deleteAppointment);

// // Appointment Schema
// const appointmentSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Patient
//     doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Doctor
//     appointmentDate: Date,
//     serialNumber: Number
// }, { timestamps: true });


//@ROUTE: GET api/appointments
//@DESC: Get all appointments
//@ACCESS: Public

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json({
            success: true,
            data: appointments,
            messsage: 'Successfully fetched all appointments'
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


//@ROUTE: GET api/appointments/:id
//@DESC: Get a appointment by id
//@ACCESS: Public

const getAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: appointment,
            messsage: 'Successfully fetched appointment'
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


//@ROUTE: POST api/appointments
//@DESC: Create a new appointment
//@ACCESS: Public
const createAppointment = async (req, res) => {
    const { body } = req;
    try {
        const appointment = await Appointment.create(body);
        res.status(200).json({
            success: true,
            data: appointment,
            messsage: 'Successfully created appointment'
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

//@ROUTE: PUT api/appointments/:id
//@DESC: Update a appointment
//@ACCESS: Public

const updateAppointment = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            success: true,
            data: appointment,
            messsage: 'Successfully updated appointment'
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


//@ROUTE: DELETE api/appointments/:id
//@DESC: Delete a appointment
//@ACCESS: Public

const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: appointment,
            messsage: 'Successfully deleted appointment'
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
    getAllAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment
}

