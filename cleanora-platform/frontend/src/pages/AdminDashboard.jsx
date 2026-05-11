import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteBooking,
  getBookings,
  markBookingCompleted
} from '../api/client.js';
import SectionHeader from '../components/SectionHeader.jsx';

function formatDate(value) {
  if (!value) {
    return 'Not set';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(value));
}

function StatusBadge({ status }) {
  const isCompleted = status === 'Completed';

  return (
    <span
      className={`inline-flex rounded-lg px-3 py-1 text-xs font-black ${
        isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
      }`}
    >
      {status}
    </span>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeActionId, setActiveActionId] = useState('');

  const token = localStorage.getItem('cleanoraAdminToken');

  useEffect(() => {
    async function loadBookings() {
      try {
        const bookingData = await getBookings(token);
        setBookings(bookingData);
        setStatus('success');
      } catch (requestError) {
        if (requestError.status === 401) {
          localStorage.removeItem('cleanoraAdminToken');
          navigate('/admin/login', { replace: true });
          return;
        }

        setError(requestError.message || 'Unable to load bookings.');
        setStatus('error');
      }
    }

    loadBookings();
  }, [navigate, token]);

  const stats = useMemo(() => {
    const total = bookings.length;
    const completed = bookings.filter((booking) => booking.status === 'Completed').length;
    const pending = total - completed;

    return { total, pending, completed };
  }, [bookings]);

  function logout() {
    localStorage.removeItem('cleanoraAdminToken');
    navigate('/admin/login', { replace: true });
  }

  async function handleComplete(id) {
    setActiveActionId(id);
    setMessage('');
    setError('');

    try {
      const result = await markBookingCompleted(id, token);
      setBookings((currentBookings) =>
        currentBookings.map((booking) => (booking._id === id ? result.data : booking))
      );
      setMessage(result.message || 'Booking marked as completed.');
    } catch (requestError) {
      if (requestError.status === 401) {
        logout();
        return;
      }

      setError(requestError.message || 'Unable to update booking.');
    } finally {
      setActiveActionId('');
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Delete this booking permanently?');

    if (!confirmed) {
      return;
    }

    setActiveActionId(id);
    setMessage('');
    setError('');

    try {
      const result = await deleteBooking(id, token);
      setBookings((currentBookings) => currentBookings.filter((booking) => booking._id !== id));
      setMessage(result.message || 'Booking deleted successfully.');
    } catch (requestError) {
      if (requestError.status === 401) {
        logout();
        return;
      }

      setError(requestError.message || 'Unable to delete booking.');
    } finally {
      setActiveActionId('');
    }
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <SectionHeader
            eyebrow="Dashboard"
            title="Booking management"
            description="Review customer booking requests, complete jobs, and remove test entries."
          />
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black text-cleanora-ink transition hover:border-cleanora-mint hover:text-cleanora-mint md:mt-4"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            { label: 'Total Bookings', value: stats.total },
            { label: 'Pending Bookings', value: stats.pending },
            { label: 'Completed Bookings', value: stats.completed }
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
              <p className="mt-3 text-4xl font-black text-cleanora-ink">{item.value}</p>
            </div>
          ))}
        </div>

        {message && (
          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {status === 'loading' && (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-600">
            Loading bookings...
          </div>
        )}

        {status === 'error' && (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-600">
            Bookings could not be loaded. Please login again or check the backend server.
          </div>
        )}

        {status === 'success' && bookings.length === 0 && (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 text-center">
            <h3 className="text-xl font-black text-cleanora-ink">No bookings yet</h3>
            <p className="mt-3 text-sm text-slate-600">Customer submissions will appear here.</p>
          </div>
        )}

        {status === 'success' && bookings.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
            <div className="hidden overflow-x-auto lg:block">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-cleanora-mist text-xs uppercase tracking-[0.12em] text-cleanora-ink">
                  <tr>
                    <th className="px-5 py-4 font-black">Customer</th>
                    <th className="px-5 py-4 font-black">Service</th>
                    <th className="px-5 py-4 font-black">Schedule</th>
                    <th className="px-5 py-4 font-black">Address</th>
                    <th className="px-5 py-4 font-black">Status</th>
                    <th className="px-5 py-4 font-black">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="align-top">
                      <td className="px-5 py-4">
                        <p className="font-black text-cleanora-ink">{booking.customerName}</p>
                        <p className="mt-1 text-slate-600">{booking.email}</p>
                        <p className="mt-1 text-slate-600">{booking.phone}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-cleanora-ink">{booking.service?.name || 'Service removed'}</p>
                        <p className="mt-1 text-slate-500">{booking.notes || 'No notes'}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        <p>{formatDate(booking.date)}</p>
                        <p className="mt-1">{booking.time}</p>
                        <p className="mt-1 text-xs">Created {formatDate(booking.createdAt)}</p>
                      </td>
                      <td className="max-w-xs px-5 py-4 text-slate-600">{booking.address}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-2">
                          <button
                            type="button"
                            onClick={() => handleComplete(booking._id)}
                            disabled={booking.status === 'Completed' || activeActionId === booking._id}
                            className="rounded-lg bg-cleanora-ink px-4 py-2 text-xs font-black text-white transition hover:bg-cleanora-charcoal disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Mark as Completed
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(booking._id)}
                            disabled={activeActionId === booking._id}
                            className="rounded-lg border border-red-200 px-4 py-2 text-xs font-black text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 lg:hidden">
              {bookings.map((booking) => (
                <article key={booking._id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black text-cleanora-ink">{booking.customerName}</h3>
                      <p className="mt-1 text-sm text-slate-600">{booking.service?.name || 'Service removed'}</p>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-slate-600">
                    <p>{booking.email}</p>
                    <p>{booking.phone}</p>
                    <p>
                      {formatDate(booking.date)} at {booking.time}
                    </p>
                    <p>{booking.address}</p>
                    <p>{booking.notes || 'No notes'}</p>
                    <p className="text-xs">Created {formatDate(booking.createdAt)}</p>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handleComplete(booking._id)}
                      disabled={booking.status === 'Completed' || activeActionId === booking._id}
                      className="rounded-lg bg-cleanora-ink px-4 py-3 text-xs font-black text-white transition hover:bg-cleanora-charcoal disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Mark as Completed
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(booking._id)}
                      disabled={activeActionId === booking._id}
                      className="rounded-lg border border-red-200 px-4 py-3 text-xs font-black text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
