import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  deleteBooking,
  getBookings,
  markBookingCompleted
} from '../api/client.js';
import BookingActivityChart from '../components/admin/BookingActivityChart.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../components/ui/alert-dialog.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent } from '../components/ui/card.jsx';
import { Skeleton } from '../components/ui/skeleton.jsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../components/ui/table.jsx';

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
  return <Badge variant={status === 'Completed' ? 'success' : 'warning'}>{status}</Badge>;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState('loading');
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
    toast.success('Logged out successfully.');
    navigate('/admin/login', { replace: true });
  }

  async function handleComplete(id) {
    setActiveActionId(id);
    setError('');

    try {
      const result = await markBookingCompleted(id, token);
      setBookings((currentBookings) =>
        currentBookings.map((booking) => (booking._id === id ? result.data : booking))
      );
      toast.success(result.message || 'Booking marked as completed.');
    } catch (requestError) {
      if (requestError.status === 401) {
        logout();
        return;
      }

      toast.error(requestError.message || 'Unable to update booking.');
    } finally {
      setActiveActionId('');
    }
  }

  async function handleDelete(id) {
    setActiveActionId(id);
    setError('');

    try {
      const result = await deleteBooking(id, token);
      setBookings((currentBookings) => currentBookings.filter((booking) => booking._id !== id));
      toast.success(result.message || 'Booking deleted successfully.');
    } catch (requestError) {
      if (requestError.status === 401) {
        logout();
        return;
      }

      toast.error(requestError.message || 'Unable to delete booking.');
    } finally {
      setActiveActionId('');
    }
  }

  function BookingActions({ booking }) {
    return (
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          size="sm"
          onClick={() => handleComplete(booking._id)}
          disabled={booking.status === 'Completed' || activeActionId === booking._id}
        >
          Mark as Completed
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              disabled={activeActionId === booking._id}
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this booking?</AlertDialogTitle>
              <AlertDialogDescription>
                This permanently removes the booking for {booking.customerName}. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleDelete(booking._id)}
              >
                Delete Booking
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
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
          <Button type="button" variant="outline" onClick={logout} className="md:mt-4">
            Logout
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            { label: 'Total Bookings', value: stats.total },
            { label: 'Pending Bookings', value: stats.pending },
            { label: 'Completed Bookings', value: stats.completed }
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="p-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                <p className="mt-3 text-4xl font-black text-cleanora-ink">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {status === 'loading' && (
          <div className="mt-8 grid gap-4">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-44" />
                <Skeleton className="mt-2 h-4 w-72 max-w-full" />
                <Skeleton className="mt-6 h-[280px] w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="mt-5 h-12 w-full" />
                <Skeleton className="mt-3 h-12 w-full" />
              </CardContent>
            </Card>
          </div>
        )}

        {status === 'error' && (
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-black text-cleanora-ink">Bookings could not be loaded</h3>
              <p className="mt-3 text-sm text-slate-600">
                {error || 'Please login again or check the backend server.'}
              </p>
            </CardContent>
          </Card>
        )}

        {status === 'success' && <BookingActivityChart bookings={bookings} />}

        {status === 'success' && bookings.length === 0 && (
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-black text-cleanora-ink">No bookings yet</h3>
              <p className="mt-3 text-sm text-slate-600">Customer submissions will appear here.</p>
            </CardContent>
          </Card>
        )}

        {status === 'success' && bookings.length > 0 && (
          <Card className="mt-8 overflow-hidden shadow-soft">
            <div className="hidden lg:block">
              <Table>
                <TableHeader className="bg-cleanora-mist">
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell>
                        <p className="font-black text-cleanora-ink">{booking.customerName}</p>
                        <p className="mt-1 text-slate-600">{booking.email}</p>
                        <p className="mt-1 text-slate-600">{booking.phone}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-cleanora-ink">{booking.service?.name || 'Service removed'}</p>
                        <p className="mt-1 text-slate-500">{booking.notes || 'No notes'}</p>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        <p>{formatDate(booking.date)}</p>
                        <p className="mt-1">{booking.time}</p>
                        <p className="mt-1 text-xs">Created {formatDate(booking.createdAt)}</p>
                      </TableCell>
                      <TableCell className="max-w-xs text-slate-600">{booking.address}</TableCell>
                      <TableCell>
                        <StatusBadge status={booking.status} />
                      </TableCell>
                      <TableCell>
                        <BookingActions booking={booking} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid gap-4 p-4 lg:hidden">
              {bookings.map((booking) => (
                <Card key={booking._id}>
                  <CardContent className="p-4">
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

                    <div className="mt-4">
                      <BookingActions booking={booking} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
