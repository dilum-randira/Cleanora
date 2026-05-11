import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/client.js';
import SectionHeader from '../components/SectionHeader.jsx';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('cleanoraAdminToken')) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Email and password are required.');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const result = await adminLogin(formData);
      localStorage.setItem('cleanoraAdminToken', result.token);
      navigate('/admin/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.message || 'Admin login failed.');
      setStatus('error');
    }
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Admin"
        title="Cleanora admin login"
        description="Sign in to review booking requests, update statuses, and manage customer submissions."
      />

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft"
      >
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <label className="block">
          <span className="text-sm font-bold text-cleanora-ink">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cleanora-mint focus:ring-4 focus:ring-cleanora-mint/10"
            placeholder="admin@cleanora.com"
          />
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-bold text-cleanora-ink">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cleanora-mint focus:ring-4 focus:ring-cleanora-mint/10"
            placeholder="admin123"
          />
        </label>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-6 w-full rounded-lg bg-cleanora-ink px-6 py-4 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-cleanora-charcoal disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === 'loading' ? 'Signing In...' : 'Login'}
        </button>
      </form>
    </section>
  );
}

export default AdminLogin;
