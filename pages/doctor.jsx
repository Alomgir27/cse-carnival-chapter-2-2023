// const userSchema = new mongoose.Schema({
//     username: String,
//     password: String, // You should hash and salt passwords for security
//     name: String,
//     contact: {
//         address: [mongoose.Schema.Types.Mixed], // Store multiple addresses as needed
//         phoneNumber: String,
//     },
//     email: {
//         type: String,
//         unique: true,
//     },
//     imageUri: String,
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
//             certifications: String,
//             availability: {
//                 day: [String], //['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
//                 time: {
//                     start: String,
//                     end: String,
//                 }
//             },
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
//             isVerified: {
//                 type: Boolean,
//                 default: false,
//             }
//         },
//         //consultant
//         consultant: {
//             fees: Number,
//             isBusy: Boolean,
//         }
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

// make a good doctor dash board with tailwind CSS just fontend where user can see his problem and this appointment section

// // Appointment Schema
// const appointmentSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Patient
//     doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Doctor
//     appointmentDate: Date,
//     serialNumber: Number,
//     appointmentType: {
//         type: String,
//         enum: ['newPatient', 'followUp'],
//         default: 'newPatient',
//     },
//     status: {
//         type: String,
//         enum: ['pending', 'confirmed', 'completed', 'cancelled'],
//         default: 'pending',
//     },
//     payment: {
//         amount: Number,
//         paymentMethod: String,
//         paymentDate: Date,
//     },
//     emergency: Boolean,
//     reasonOfEmergency: {
//         type: String,
//         enum: ['accident', 'heartAttack', 'stroke', 'others'],
//         default: 'others',
//     },
//     feeForEmergency: Number,

// }, { timestamps: true });

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";


const DoctorDashboard = () => {
    const router = useRouter();
    const [hidden, setHindden] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen pb-8 flex flex-col">
            <button className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded shadow-md" onClick={() => router.back()}>Back</button>

            {/* Navbar */}
            <nav className="bg-red-500 p-4 text-white flex justify-between">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto mt-8 p-4 flex flex-col space-y-4">
                {/* Profile Section */}
                <div className="bg-white p-4 rounded shadow-md flex flex-col space-y-4">
                    <div className="flex justify-between items-center p-y-12">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-semibold mb-2 text-gray-700">Profile</h2>

                            {/* Display Doctor's Profile Information */}
                            {/* Replace with dynamic data from your backend */}
                            <p className="text-gray-600 mt-1">Dr. {user?.username}</p>
                            <p className="text-gray-600 mt-1">Specializations: {user?.profile?.doctor?.specializations}</p>
                            <p className="text-gray-600 mt-1">Availability: {user?.profile?.doctor?.availability?.day.map((day, index) => (<span key={index}>{day}, </span>))}</p>
                            <p className="text-gray-600 mt-1">Time: {moment(user?.profile?.doctor?.availability?.time?.start, "HH:mm").format("hh:mm A")} - {moment(user?.profile?.doctor?.availability?.time?.end, "HH:mm").format("hh:mm A")}</p>
                            <p className="text-gray-600 mt-1">Fee: {user?.profile?.doctor?.newPatientFee}</p>
                            <p className="text-gray-600 mt-1">Rating: {user?.profile?.doctor?.rating || 5}</p>
                            <p className="text-gray-600 mt-1">Reviews: {user?.profile?.doctor?.reviews?.length || "500K"}</p>
                            <p className="text-gray-600 mt-1">Follow Up: {user?.profile?.doctor?.followUp?.length || "3M"}</p>
                        </div>
                        <p className="text-gray-600">Dr {user?.username} <br /> <span className="text-red-500">Internal Medicine</span></p>

                        <div className="flex flex-col">
                            <Image
                                src='https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg?w=740&t=st=1697341569~exp=1697342169~hmac=2b2e4d703279b2aa7b4bdbcf5cf6158946e3cf212589ceb4f88cb6e9d905905c'
                                alt="Doctor's Profile Picture"
                                width={200}
                                height={200}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <a href="#" className="text-red-500">Edit Profile</a>
                    </div>
                </div>

                {/* Appointments Section */}
                <div className="bg-white p-4 mt-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Appointments</h2>
                    <p className="text-gray-600">You have 3 appointments today.</p>
                    {/* isEmergency */}

                    {/* Replace with dynamic data from your backend */}
                    <div className="flex flex-col space-y-4 mt-4">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold">Dr. John Doe</p>
                                <p className="text-gray-600">Internal Medicine</p>
                            </div>
                            <p className="text-gray-600">10:00 AM</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold">Dr. John Doe</p>
                                <p className="text-gray-600">Internal Medicine</p>
                            </div>
                            <p className="text-gray-600">10:00 AM</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold">Dr. John Doe</p>
                                <p className="text-gray-600">Internal Medicine</p>
                            </div>
                            <p className="text-gray-600">10:00 AM</p>
                        </div>
                        <div className="flex justify-end">
                            <a href="#" className="text-red-500">View All</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}



export default DoctorDashboard;