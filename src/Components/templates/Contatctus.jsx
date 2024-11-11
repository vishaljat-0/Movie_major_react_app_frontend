import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaLinkedin } from "react-icons/fa";
import vishal from "../../utils/Vishal.jpg";

const ContactUs = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen bg-[#1F1E24] flex flex-col">
            {/* Header Section */}
            <div className="mt-5 px-10 w-full bg-[#1F1E24] flex items-center">
                <i
                    onClick={() => navigate(-1)}
                    className="text-white bg-[#6556CD] p-3 rounded-full shadow-md hover:bg-[#5248b2] mr-3 transition-all duration-300 transform hover:scale-110 hover:rotate-[-10deg] hover:shadow-2xl"
                >
                    <FaArrowLeft className="text-sm" />
                </i>
                <h1 className="text-2xl font-semibold text-zinc-400">Contact Us</h1>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col items-center justify-center h-full px-5 bg-gradient-to-b from-[#1F1E24] to-[#161616]">
                <div className="bg-[#2A2A2A] rounded-lg shadow-lg p-8 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold text-[#FFDD57] mt-2 mb-4">Get in Touch</h2>
                    <p className="text-zinc-300 mt-5">
                        We would love to hear from you! If you have any questions, feedback, or inquiries, feel free to reach out to us.
                    </p>
                    <p className="text-zinc-300 mt-3">
                        You can contact us at:
                    </p>
                    <p className="text-zinc-300 mt-2 font-semibold">Email: vishujat08@gmail.com</p>
                    <p className="text-zinc-300 mt-2 font-semibold">Follow us on social media for updates!</p>
                </div>

                {/* Developer Section */}
                <div className="mt-8 flex flex-col items-center">
                    <img 
                        src={vishal} // Developer's image URL
                        alt="Developer"
                        className="w-24 h-24 rounded-full border-4 border-[#FFDD57] shadow-lg" // Smaller image size
                    />
                    <h3 className="text-xl font-semibold text-[#FFDD57] mt-3">Vishal Jat</h3>
                    <p className="text-zinc-300">Web Developer | Designer</p>
                    <a
                        href="https://www.linkedin.com/in/Vishal9685"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center mt-3 text-[#FFDD57] hover:text-[#5248b2] transition-all duration-300"
                    >
                        <FaLinkedin className="mr-2" /> Connect on LinkedIn
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
