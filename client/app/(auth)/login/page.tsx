import React from 'react'
import { LoginForm } from './components/LoginForm'

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full md:w-1/3 p-4 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage