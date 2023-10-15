import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../../components/Navbar';

export default function SignUp() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        imageUri: '',
        contact: {
            address: [],
            phoneNumber: '',
        },
        email: '',
        biometricData: {
            fingerprint: '',
            faceRecognition: '',
        },
        profile: {
            doctor: {
                specializations: [],
                certifications: '',
                availability: {
                    day: [], // 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                    time: {
                        start: '', // '9:00 AM'
                        end: '', // '5:00 PM'
                    }
                },
            },
        },
        role: 'patient',
        subscription: 'free',
    });
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(null);
    const [certificate, setCertificate] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const fileForm = new FormData();
        fileForm.append('file', image);
        let imageUri = '';
        let certificateUri = '';

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, fileForm)
                .then(async (res) => {
                    imageUri = res.data.data;
                    console.log(imageUri);
                    if (certificate) {
                        const certificateForm = new FormData();
                        certificateForm.append('file', certificate);
                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, certificateForm)
                            .then(async (res) => {
                                certificateUri = res.data.data;
                                console.log(certificateUri);
                                let obj = {
                                    imageUri,
                                    username: formData.username,
                                    password: formData.password,
                                    name: formData.name,
                                    email: formData.email,
                                    role: formData.role,
                                    profile: {
                                        ...formData.profile,
                                        doctor: {
                                            ...formData.profile.doctor,
                                            certifications: certificateUri,
                                        }
                                    }

                                };
                                console.log(obj);

                                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(obj),
                                });

                                console.log(response);

                                const data = await response.json();
                                console.log(data);
                                localStorage.setItem('token', data.token);
                                localStorage.setItem('user', JSON.stringify(data.data));
                                router.push('/');

                            })
                            .catch((err) => {
                                console.log(err);
                            })

                    } else {
                        let obj = {
                            imageUri,
                            username: formData.username,
                            password: formData.password,
                            name: formData.name,
                            email: formData.email,
                            role: formData.role,
                            profile: {
                                ...formData.profile,
                            }
                        };
                        console.log(obj);

                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(obj),
                        });

                        console.log(response);

                        const data = await response.json();
                        console.log(data);
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('user', JSON.stringify(data.data));
                        router.push('/');

                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);
    }








    useEffect(() => {
        //day any value have even time then remove thoes day
        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
            let freq = 0;
            formData.profile.doctor.availability.day.map(d => {
                if (d === day) freq++;
            });
            if (freq % 2 === 0) {
                formData.profile.doctor.availability.day = formData.profile.doctor.availability.day.filter(d => d !== day);
            }
        });
    }, [formData.profile.doctor.availability.day]);

    const renderUserTypeFields = useCallback(() => {

        return (
            <div className="space-y-2 mt-2">

                {formData.role === 'doctor' && (
                    <>
                        <p className="text-gray-600 mb-2 block">
                            Add Specializations
                        </p>
                        <input
                            type="text"
                            name="specializations"
                            id="specializations"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                            placeholder="Add Specializations (comma separated)"
                            onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, doctor: { ...formData.profile.doctor, specializations: e.target.value.split(',') } } })}
                        />
                    </>
                )}
                {formData.role === 'doctor' && (
                    <>
                        <p className="text-gray-600 mb-2 block">
                            Add  Certifications
                        </p>
                        <input
                            type="file"
                            name="certifications"
                            id="certifications"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                            placeholder="Certifications"
                            onChange={(e) => setCertificate(e.target.files[0])}
                        />
                    </>
                )}
                {formData.role === 'doctor' && (
                    console.log(formData.profile.doctor.availability),
                    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <div key={day} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={day}
                                className="border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                                onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, doctor: { ...formData.profile.doctor, availability: { ...formData.profile.doctor.availability, day: [...formData.profile.doctor.availability.day, day] } } } })}
                                multiple

                            />
                            <label htmlFor={day} className="text-gray-600 mb-2 block">
                                {day}
                            </label>
                        </div>
                    ))
                )}
                {formData.role === 'doctor' && (
                    <div className="flex items-center justify-between">
                        <DatePicker
                            selected={formData.profile.doctor.availability.time.start}
                            onChange={(date) => setFormData({ ...formData, profile: { ...formData.profile, doctor: { ...formData.profile.doctor, availability: { ...formData.profile.doctor.availability, time: { ...formData.profile.doctor.availability.time, start: date } } } } })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            popperPlacement="bottom"
                            placeholderText='Start Time'
                            className='border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400'
                            required
                        />
                        <DatePicker
                            selected={formData.profile.doctor.availability.time.end}
                            onChange={(date) => setFormData({ ...formData, profile: { ...formData.profile, doctor: { ...formData.profile.doctor, availability: { ...formData.profile.doctor.availability, time: { ...formData.profile.doctor.availability.time, end: date } } } } })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            popperPlacement="bottom"
                            placeholderText='End Time'
                            className='border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400'
                            required
                        />
                    </div>
                )}

                {formData.role === 'doctor' && (
                    <>
                        <p className="text-gray-600 mb-2 block">
                            Add Service Fee
                        </p>
                        <input
                            type="text"
                            name="newPatientFee"
                            id="newPatientFee"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                            placeholder="Service Fee"
                            onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, doctor: { ...formData.profile.doctor, newPatientFee: e.target.value } } })}
                            required
                        />
                    </>
                )}

            </div>
        );



    }, [formData.role, formData.profile]);

    return (
        <div className="">
            <Navbar />
            <div className="max-w-lg mx-auto my-10 flex flex-col items-center justify-center">
                <div className="max-w-lg w-full px-6 py-4 border-red-500 border-2 rounded-xl overflow-hidden">
                    <h2 className="text-2xl text-center uppercase font-medium mb-1 text-gray-700">Sign Up</h2>
                    {/* <p className="text-gray-600 mb-6 text-sm">Join us and create your account!</p> */}
                    <form>
                        <p className="text-red-500"></p>
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="username" className="text-gray-600 mb-2 block">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-gray-600 mb-2 block">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                                    placeholder="abcd@gmail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="password" className="text-gray-600 mb-2 block">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="username" className="text-gray-600 mb-2 block">
                                    Upload Profile Picture
                                </label>
                                <input
                                    type="file"
                                    name="imageUri"
                                    id="imageUri"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                                    placeholder="Uploads Image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    required
                                />
                            </div>
                        </div>
                        {image && (
                            <div className="space-y-2">
                                <div>
                                    <label htmlFor="username" className="text-gray-600 mb-2 block">
                                        Image Preview
                                    </label>
                                    <Image src={URL.createObjectURL(image)} width={200} height={200} />
                                </div>
                            </div>
                        )}
                        <div className="space-y-2">
                            <label htmlFor="role" className="text-gray-600 mb-2 block">
                                User Type
                            </label>
                            <select
                                name="role"
                                id="role"
                                onChange={handleChange}
                                value={formData.role}
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500"
                            >
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                                <option value="consultant">Consultant</option>
                            </select>
                        </div>
                        {renderUserTypeFields()}
                        <div className="mt-4 flex  flex-col justify-center items-center">
                            <button
                                type="submit"
                                className="w-[40%]  text-center py-2 text-black border  rounded hover:bg-red-500 hover:text-white-500 transition uppercase font-roboto font-medium tracking-wide text-sm focus:outline-none focus:ring-0 focus:border-red-500 bg-red-400"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                Sign Up
                            </button>
                            <div className="flex gap-2 pt-5 mb-3">
                                <p className="text-gray-600 text-sm">Already have an account?</p>
                                <a className="text-gray-600 text-sm underline" href="/signIn">
                                    Log in here
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
