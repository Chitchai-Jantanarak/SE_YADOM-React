import React, { useState, useEffect } from 'react';
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
        <div className='register min-h-screen'>  
            <section className=' max-h-full max-w-full grid grid-rows-10'>
                <div className='row-span-1'>.
                    
                </div>

                <div class="grid grid-cols-3 row-span-9">
                    <div class="register-grid-primary col-span-2 flex">
                        

                    </div>

                    <div class="register-grid-secondary col-span-1 flex">dasdas</div>
                </div>
            </section>
        </div>
    );
}