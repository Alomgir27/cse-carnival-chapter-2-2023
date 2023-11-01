const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/index');
const { Review } = require('../models/index');

// router.get('/users', validateToken, userController.getAllUsers);
// router.get('/users/:id', validateToken, userController.getUser);
// router.post('/users/create', userController.createUser);
// router.post('/users/login', userController.loginUser);
// router.put('/users/:id', validateToken, userController.updateUser);
// router.delete('/users/:id', validateToken, userController.deleteUser);
// // User Schema (for both patients and doctors)
// const userSchema = new mongoose.Schema({
//     username: String,
//     password: String, // You should hash and salt passwords for security
//     name: String,
//     contact: {
//         address: [mongoose.Schema.Types.Mixed], // Store multiple addresses as needed
//         phoneNumber: String,
//     },
//     email: String,
//     biometricData: {
//         fingerprint: String,
//         faceRecognition: String,
//     },
//     profile: {
//         //patient
//         patient: {
//             medicalHistory: [mongoose.Schema.Types.Mixed], // Store multiple medical history records as needed
//             medications: [mongoose.Schema.Types.Mixed], // Store multiple medications as needed
//             allergies: [String],
//             balance: Number,
//             personalConsultant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//         },
//         //doctor
//         doctor: {
//             specializations: [String],
//             certifications: [String],
//             availability: [{
//                 day: String,
//                 time: {
//                     start: String,
//                     end: String,
//                 }
//             }],
//             newPatientFee: Number,
//             followUpFee: Number,
//             rating: Number,
//             reviews: [{
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Review'
//             }],
//             followUp: [{
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'User'
//             }],
//             patients: [{
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'User'
//             }],
//         },
//         //consultant
//         consultant: {
//             fees: Number,
//         },
//         //admin
//         admin: {

//         },
//     },
//     role: {
//         type: String,
//         enum: ['patient', 'doctor', 'consultant', 'admin'],
//         default: 'patient',
//     },
//     subscription: {
//         type: String,
//         enum: ['free', 'basic', 'premium'],
//         default: 'free',
//     },
// }, { timestamps: true });

//@ROUTE: GET /api/users
//@DESC: Get all users
//@ACCESS: Public

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users,
            messsage: 'Successfully fetched all users'
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


//@ROUTE: GET /api/users/:id
//@DESC: Get a user by id
//@ACCESS: Public

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: user,
            messsage: 'Successfully fetched user'
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

//@ROUTE: POST /api/users/create
//@DESC: Create a new user
//@ACCESS: Public

const createUser = async (req, res) => {
    const { body } = req;
    console.log(body);
    try {
        const password = await bcrypt.hash(body.password, 10);
        const username = body.username;
        const email = body.email;
        const role = body.role;
        const contact = body.contact;
        const profile = body.profile;
        const imageUri = body.imageUri;

        const user = await User.create({
            username,
            password,
            email,
            role,
            contact,
            profile,
            imageUri
        });


        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            user.password = undefined;
            res.status(200).json({
                success: true,
                data: user,
                token,
                messsage: 'Successfully created user'
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }
}

//@ROUTE: POST /api/users/login
//@DESC: Login a user
//@ACCESS: Public

const loginUser = async (req, res) => {
    const { body } = req;

    try {
        const email = body.email;
        const password = body.password;

        const user = await User.findOne({ email });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
                user.password = undefined;
                res.status(200).json({
                    success: true,
                    data: user,
                    token,
                    messsage: 'Successfully logged in user'
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    data: null,
                    message: 'Invalid credentials'
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                data: null,
                message: 'Invalid credentials'
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }
}



//@ROUTE: PUT /api/users/:id
//@DESC: Update a user by id
//@ACCESS: Public

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const user = await User.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            success: true,
            data: user,
            messsage: 'Successfully updated user'
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

//@ROUTE: DELETE /api/users/:id
//@DESC: Delete a user by id
//@ACCESS: Public

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: user,
            messsage: 'Successfully deleted user'
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
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser

}
