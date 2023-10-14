const { Disease } = require('../models/index');
const { User } = require('../models/index');



// router.get('/diseases', diseaseController.getAllDiseases);
// router.get('/diseases/:id', diseaseController.getDisease);
// router.post('/diseases', diseaseController.createDisease);
// router.put('/diseases/:id', diseaseController.updateDisease);
// router.delete('/diseases/:id', diseaseController.deleteDisease);
// const diseaseSchema = new mongoose.Schema({
//     name: String,
//     symptoms: [String],
//     precautions: [String],
//     treatment: [String],
//     medicines: [String],
//     doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// }, { timestamps: true });


//@ROUTE: GET api/diseases
//@DESC: Get all diseases
//@ACCESS: Public

const getAllDiseases = async (req, res) => {
    try {
        const diseases = await Disease.find();
        res.status(200).json({
            success: true,
            data: diseases,
            messsage: 'Successfully fetched all diseases'
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


//@ROUTE: GET api/diseases/:id
//@DESC: Get a disease by id
//@ACCESS: Public

const getDisease = async (req, res) => {
    try {
        const disease = await Disease.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: disease,
            messsage: 'Successfully fetched disease'
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


//@ROUTE: POST api/diseases
//@DESC: Create a new disease
//@ACCESS: Public

const createDisease = async (req, res) => {
    const { body } = req;
    try {
        const disease = await Disease.create(body);
        res.status(200).json({
            success: true,
            data: disease,
            messsage: 'Successfully created disease'
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


//@ROUTE: PUT api/diseases/:id
//@DESC: Update a disease
//@ACCESS: Public

const updateDisease = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const disease = await Disease.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            success: true,
            data: disease,
            messsage: 'Successfully updated disease'
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


//@ROUTE: DELETE api/diseases/:id
//@DESC: Delete a disease
//@ACCESS: Public

const deleteDisease = async (req, res) => {
    const { id } = req.params;

    try {
        const disease = await Disease.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: disease,
            messsage: 'Successfully deleted disease'
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

module.exports = {
    getAllDiseases,
    getDisease,
    createDisease,
    updateDisease,
    deleteDisease
}