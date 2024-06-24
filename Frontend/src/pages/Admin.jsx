import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === '1234') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = async () => {
    try {
      const encodedEmail = btoa(email);
      const registrationLink = `http://localhost:5173/register/${encodedEmail}`;

      const templateParams = {

        email_to: email,
        registration_link: registrationLink,
      };

      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,   
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY
      );

      alert('Registration link sent!');
      navigate("/")
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!authenticated ? (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handlePasswordSubmit}
          >
            Login
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Send Registration Link</h2>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
          <button
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            onClick={handleSendEmail}
          >
            Send Email
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
