// pages/index.js
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Developer Platform | Home</title>
        <meta name="description" content="Join our network of talented developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the Developer Platform</h1>
          <p className="text-lg text-gray-600 mb-8">Join our network of talented developers</p>
          <Link href="/register">
            <a className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
              Register Now
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}

// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    yourPortfolio: '',
    yourTopProject1: '',
    yourTopProject2: '',
    yourTopProject3: '',
    detail: '',
    niche: '',
    address: '',
    country: '',
    yearOfExperience: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.yourPortfolio.trim()) newErrors.yourPortfolio = 'Portfolio URL is required';
    if (!formData.yourTopProject1.trim()) newErrors.yourTopProject1 = 'At least one project is required';
    if (!formData.niche.trim()) newErrors.niche = 'Skills/niche is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.yearOfExperience.trim()) newErrors.yearOfExperience = 'Years of experience is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your API
      console.log('Form submitted with:', formData);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store data in localStorage for demonstration purposes
      localStorage.setItem('userData', JSON.stringify(formData));
      
      // Redirect to dashboard after successful submission
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>Register | Developer Platform</title>
        <meta name="description" content="Join our developer network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-3xl mx-auto px-4">
        <nav className="mb-8">
          <Link href="/">
            <a className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Home
            </a>
          </Link>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Developer Registration</h1>
          <p className="text-gray-600 mt-2">
            Join our network of talented developers specializing in Kafka, ThreeJS, Angular, React, MongoDB, and more!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Personal Information
              </h2>
              
              <div className="mb-5">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-5">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="mb-5">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-5">
                  <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="country" className="block text-gray-700 font-medium mb-1">
                    Country*
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.country ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.country}
                    onChange={handleChange}
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Professional Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-5">
                  <label htmlFor="yourPortfolio" className="block text-gray-700 font-medium mb-1">
                    Portfolio URL*
                  </label>
                  <input
                    type="url"
                    id="yourPortfolio"
                    name="yourPortfolio"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.yourPortfolio ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.yourPortfolio}
                    onChange={handleChange}
                  />
                  {errors.yourPortfolio && (
                    <p className="mt-1 text-sm text-red-600">{errors.yourPortfolio}</p>
                  )}
                </div>

                <div className="mb-5">
                  <label htmlFor="yearOfExperience" className="block text-gray-700 font-medium mb-1">
                    Years of Experience*
                  </label>
                  <input
                    type="text"
                    id="yearOfExperience"
                    name="yearOfExperience"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.yearOfExperience ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.yearOfExperience}
                    onChange={handleChange}
                  />
                  {errors.yearOfExperience && (
                    <p className="mt-1 text-sm text-red-600">{errors.yearOfExperience}</p>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="niche" className="block text-gray-700 font-medium mb-1">
                  Skills/Technologies*
                </label>
                <input
                  type="text"
                  id="niche"
                  name="niche"
                  placeholder="e.g., Kafka, ThreeJS, Angular, React, MongoDB"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.niche ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.niche}
                  onChange={handleChange}
                />
                {errors.niche && (
                  <p className="mt-1 text-sm text-red-600">{errors.niche}</p>
                )}
              </div>
            </div>

            {/* Project Showcase Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Project Showcase
              </h2>
              
              <div className="mb-5">
                <label htmlFor="yourTopProject1" className="block text-gray-700 font-medium mb-1">
                  Top Project 1*
                </label>
                <input
                  type="url"
                  id="yourTopProject1"
                  name="yourTopProject1"
                  placeholder="Project URL"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.yourTopProject1 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.yourTopProject1}
                  onChange={handleChange}
                />
                {errors.yourTopProject1 && (
                  <p className="mt-1 text-sm text-red-600">{errors.yourTopProject1}</p>
                )}
              </div>

              <div className="mb-5">
                <label htmlFor="yourTopProject2" className="block text-gray-700 font-medium mb-1">
                  Top Project 2
                </label>
                <input
                  type="url"
                  id="yourTopProject2"
                  name="yourTopProject2"
                  placeholder="Project URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.yourTopProject2}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="yourTopProject3" className="block text-gray-700 font-medium mb-1">
                  Top Project 3
                </label>
                <input
                  type="url"
                  id="yourTopProject3"
                  name="yourTopProject3"
                  placeholder="Project URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.yourTopProject3}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="detail" className="block text-gray-700 font-medium mb-1">
                  Additional Information
                </label>
                <textarea
                  id="detail"
                  name="detail"
                  rows="4"
                  placeholder="Tell us why you want to join"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.detail}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {errors.submit && (
              <div className="mb-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
                {errors.submit}
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// pages/dashboard.js
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you might fetch this data from an API
    // For demonstration, we're retrieving from localStorage
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Head>
          <title>Dashboard | Developer Platform</title>
          <meta name="description" content="User dashboard" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 mb-6">No user data available. Please register first.</p>
            <Link href="/register">
              <a className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200">
                Go to Registration
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>Dashboard | Developer Platform</title>
        <meta name="description" content="User dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-4xl mx-auto px-4">
        <nav className="mb-8 flex justify-between items-center">
          <Link href="/">
            <a className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Home
            </a>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('userData');
              router.push('/');
            }}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Logout
          </button>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {userData.name}!</h1>
          <p className="text-gray-600 mt-2">Your developer dashboard</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-blue-600">
            <h2 className="text-xl font-semibold text-white">Your Profile</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p className="text-gray-800">
                      <span className="font-medium">Name:</span> {userData.name}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium">Email:</span> {userData.email}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium">Phone:</span> {userData.phone}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium">Location:</span>{' '}
                      {userData.address ? `${userData.address}, ${userData.country}` : userData.country}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Details</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p className="text-gray-800">
                      <span className="font-medium">Portfolio:</span>{' '}
                      <a 
                        href={userData.yourPortfolio.startsWith('http') ? userData.yourPortfolio : `https://${userData.yourPortfolio}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {userData.yourPortfolio}
                      </a>
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium">Skills:</span> {userData.niche}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium">Experience:</span> {userData.yearOfExperience} years
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your Projects</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {userData.yourTopProject1 && (
                      <div className="border-b border-gray-200 pb-2 last:border-b-0 last:pb-0">
                        <p className="font-medium text-gray-700">Project 1</p>
                        <a 
                          href={userData.yourTopProject1} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm block truncate"
                        >
                          {userData.yourTopProject1}
                        </a>
                      </div>
                    )}
                    
                    {userData.yourTopProject2 && (
                      <div className="border-b border-gray-200 pb-2 last:border-b-0 last:pb-0">
                        <p className="font-medium text-gray-700">Project 2</p>
                        <a 
                          href={userData.yourTopProject2} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm block truncate"
                        >
                          {userData.yourTopProject2}
                        </a>
                      </div>
                    )}
                    
                    {userData.yourTopProject3 && (
                      <div className="border-b border-gray-200 pb-2 last:border-b-0 last:pb-0">
                        <p className="font-medium text-gray-700">Project 3</p>
                        <a 
                          href={userData.yourTopProject3} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm block truncate"
                        >
                          {userData.yourTopProject3}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                {userData.detail && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-800">{userData.detail}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-center">
              <Link href="/register">
                <a className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200">
                  Edit Profile
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


