const { PatientHealthData } = require('../models/index');

// router.get('/patienthealthdata', patientHealthDataController.getAllPatientHealthData);
// router.get('/patienthealthdata/:id', patientHealthDataController.getPatientHealthData);
// router.post('/patienthealthdata', patientHealthDataController.createPatientHealthData);
// router.put('/patienthealthdata/:id', patientHealthDataController.updatePatientHealthData);
// router.delete('/patienthealthdata/:id', patientHealthDataController.deletePatientHealthData);
// Health and Fitness Data Schema (for wearables)
// const patientHealthDataSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     vitalSigns: {
//         heartRate: Number,
//         bloodPressure: String,
//         temperature: Number,
//     }
// }, { timestamps: true });


//@ROUTE: GET api/patienthealthdata
//@DESC: Get all patient health data
//@ACCESS: Public

const getAllPatientHealthData = async (req, res) => {
    try {
        const patientHealthData = await PatientHealthData.find();
        res.status(200).json({
            success: true,
            data: patientHealthData,
            messsage: 'Successfully fetched all patient health data'
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


//@ROUTE: GET api/patienthealthdata/:id
//@DESC: Get a patient health data by id
//@ACCESS: Public

const getPatientHealthData = async (req, res) => {
    try {
        const patientHealthData = await PatientHealthData.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: patientHealthData,
            messsage: 'Successfully fetched patient health data'
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


//@ROUTE: POST api/patienthealthdata
//@DESC: Create a new patient health data
//@ACCESS: Public

const createPatientHealthData = async (req, res) => {
    const { body } = req;
    try {
        const patientHealthData = await PatientHealthData.create(body);
        res.status(201).json({
            success: true,
            data: patientHealthData,
            messsage: 'Successfully created patient health data'
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


//@ROUTE: PUT api/patienthealthdata/:id
//@DESC: Update a patient health data
//@ACCESS: Public

const updatePatientHealthData = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const patienthealthdata = await PatientHealthData.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            success: true,
            data: patienthealthdata,
            messsage: 'Successfully updated patient health data'
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


//@ROUTE: DELETE api/patienthealthdata/:id
//@DESC: Delete a patient health data
//@ACCESS: Public

const deletePatientHealthData = async (req, res) => {
    const { id } = req.params;

    try {
        const patienthealthdata = await PatientHealthData.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: patienthealthdata,
            messsage: 'Successfully deleted patient health data'
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
    getAllPatientHealthData,
    getPatientHealthData,
    createPatientHealthData,
    updatePatientHealthData,
    deletePatientHealthData
}