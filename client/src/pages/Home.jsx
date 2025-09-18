// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 max-w-md w-full bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">AI Interview Prep — Demo</h1>
        <p className="mb-6">Paste a job description later to generate tailored interview Q&A.</p>
        <div className="flex gap-3">
          <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded">Register</Link>
          <Link to="/login" className="px-4 py-2 border rounded">Login</Link>
        </div>
      </div>
    </div>
  );
}
