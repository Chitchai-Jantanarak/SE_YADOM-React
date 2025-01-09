import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {

    // const [formData, setFormData] = useState({
    //     username: "",
    //     email: "",
    //     password: "",
    // });
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError("");
    //     setSuccess("");

    //     try {
    //         const response = await axios.post("https://your-backend-url.com/register", formData);
    //         setSuccess("Registration successful!");
    //     } catch (err) {
    //         setError(err.response?.data?.message || "Something went wrong. Please try again.");
    //     }
    // };

    return (
        <div className='register'>  
            <section className='max-h-full max-w-full grid sm:grid-cols-3'>

                <div className='col-span-2 grid grid-rows-8'>

                    {/* header */}
                    <div className='row-span-1 flex justify-between items-center p-5 m-0 w-full'>   
                        <div className="register-header-title">
                            <p> YADOMMM </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="font-montserrat font-extralight text-xs max-sm:hidden">
                                No Account yet?
                            </span> 
                            <Link to="/register">
                                <button className="font-montserrat font-medium px-5 py-2 border border-black">
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* content */}
                    <div className="row-span-7 register-grid-primary flex items-center justify-center">
                        <div className='inline-block font-poppins text-center w-2/3 space-y-5'>
                            <h1 className='font-extrabold text-3xl'>
                                login
                            </h1>
                            <h2 className='font-montserrat font-light text-sm text-black tracking-wider'>
                                PLEASE LOGIN TO CONTINUE TO YOUR ACCOUNT
                            </h2>

                            {/* Form */}
                            <form className="space-y-3">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="block text-left font-extrabold"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div className='space-y-2'>
                                    <label
                                        htmlFor="password"
                                        className="block text-left font-extrabold"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                
                                <Link to="/">
                                    <p className='font-montserrat font-light text-sm text-right pt-3'> Forgot Password? </p>
                                </Link>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="px-12 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="register-grid-secondary col-span-1 flex"></div>

            </section>
        </div>
    );
}