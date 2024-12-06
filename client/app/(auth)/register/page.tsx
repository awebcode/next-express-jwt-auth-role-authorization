import React from 'react'
import { RegisterForm } from './components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full md:w-1/3 p-4 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage