//@ts-nocheck
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function SignUp() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, formData);
            console.log(res.data);
            setLoading(false);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.data));
            router.push('/');
        } catch (err) {
            console.log(err);
            setLoading(false);
            alert(err.response.data.message);
        }
    };









    return (
        <div className="">
            <Navbar />
            <div className="max-w-lg mx-auto my-10 flex flex-col items-center justify-center">
                <div className="max-w-lg w-full px-6 py-4 border-red-500 border-2 rounded-xl overflow-hidden">
                    <h2 className="text-2xl text-center uppercase font-medium mb-1 text-gray-700">Sign In</h2>
                    {/* <p className="text-gray-600 mb-6 text-sm">Join us and create your account!</p> */}
                    <form>
                        <p className="text-red-500"></p>
                        <div className="space-y-2">

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

                        <div className="mt-4 flex  flex-col justify-center items-center">
                            <button
                                type="submit"
                                className="w-[40%]  text-center py-2 text-black border  rounded hover:bg-red-500 hover:text-white-500 transition uppercase font-roboto font-medium tracking-wide text-sm focus:outline-none focus:ring-0 focus:border-red-500 bg-red-400"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                Sign In
                            </button>
                            <div className="flex gap-2 pt-5 mb-3">
                                <p className="text-gray-600 text-sm">New to Healthcare</p>
                                <Link href="/signUp">
                                    Sign Up here
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
