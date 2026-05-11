import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { adminLogin } from '../api/client.js';
import SectionHeader from '../components/SectionHeader.jsx';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [status, setStatus] = useState('idle');

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
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error('Email and password are required.');
      return;
    }

    setStatus('loading');

    try {
      const result = await adminLogin(formData);
      localStorage.setItem('cleanoraAdminToken', result.token);
      toast.success(result.message || 'Admin login successful.');
      navigate('/admin/dashboard', { replace: true });
    } catch (requestError) {
      toast.error(requestError.message || 'Admin login failed.');
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

      <Card className="mx-auto max-w-md shadow-soft">
        <CardHeader>
          <CardTitle>Admin Access</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2"
                placeholder="admin@cleanora.com"
              />
            </div>

            <div className="mt-5">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2"
                placeholder="admin123"
              />
            </div>

            <Button type="submit" disabled={status === 'loading'} className="mt-6 w-full" size="lg">
              {status === 'loading' ? 'Signing In...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default AdminLogin;
