import React, { useState, useEffect } from 'react';

export default function Login() {
    return (
        <div className='register'>  
            <section className='max-h-full max-w-full grid grid-cols-3'>

                <div className='col-span-2 grid grid-rows-10'>

                    {/* header */}
                    <div className='row-span-1 flex justify-between items-center p-3 m-0 w-full'>   
                        <div className="text-xl font-bold">
                            <p> YADOMMM </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-lg">
                                No Account yet?
                            </span> 
                            <Link to="/register">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* content */}
                    <div className="row-span-9 register-grid-primary flex items-center justify-center">
                        <div className='inline-block space-y-4 font-poppins text-center'>
                            <h1 className='font-extrabold'>
                                login
                            </h1>
                            <h2>
                                PLEASE LOGIN TO CONTNUE TO YOUR ACCOUNT
                            </h2>

                            {/* Form */}
                            <form className="space-y-4 w-80">
                                {/* Email Field */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-left font-extrabold"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
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
                                        className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                
                                <Link to="/">
                                    <p> Forgot Password? </p>
                                </Link>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
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