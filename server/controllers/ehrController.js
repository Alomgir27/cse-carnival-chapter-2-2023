const { EHR } = require('../models/index');
const { User } = require('../models/index');


// router.get('/ehrs', ehrController.getAllEHRs);
// router.get('/ehrs/:id', ehrController.getEHR);
// router.post('/ehrs', ehrController.createEHR);
// router.put('/ehrs/:id', ehrController.updateEHR);
// router.delete('/ehrs/:id', ehrController.deleteEHR);
// // Electronic Health Record (EHR) Schema
// const ehrSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     data: String, // Store EHR data as needed
// }, { timestamps: true });


//@ROUTE: GET /api/ehrs
//@DESC: Get all EHRs
//@ACCESS: Public

const getAllEHRs = async (req, res) => {
    try {
        const ehrs = await EHR.find();
        res.status(200).json({
            success: true,
            data: ehrs,
            messsage: 'Successfully fetched all EHRs'
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


//@ROUTE: GET /api/ehrs/:id
//@DESC: Get a EHR by id
//@ACCESS: Public

const getEHR = async (req, res) => {
    try {
        const ehr = await EHR.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: ehr,
            messsage: 'Successfully fetched EHR'
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


//@ROUTE: POST /api/ehrs
//@DESC: Create a EHR
//@ACCESS: Public

const createEHR = async (req, res) => {
    const { body } = req;
    try {
        const ehr = await EHR.create(body);
        res.status(200).json({
            success: true,
            data: ehr,
            messsage: 'Successfully created EHR'
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


//@ROUTE: PUT /api/ehrs/:id
//@DESC: Update a EHR
//@ACCESS: Public

const updateEHR = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const ehr = await EHR.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            success: true,
            data: ehr,
            messsage: 'Successfully updated EHR'
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


//@ROUTE: DELETE /api/ehrs/:id
//@DESC: Delete a EHR
//@ACCESS: Public

const deleteEHR = async (req, res) => {
    const { id } = req.params;
    try {
        const ehr = await EHR.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: ehr,
            messsage: 'Successfully deleted EHR'
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
    getAllEHRs,
    getEHR,
    createEHR,
    updateEHR,
    deleteEHR
}