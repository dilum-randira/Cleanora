import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  CheckCircle2,
  Clock3,
  ClipboardList,
  LogOut,
  Search,
  ShieldCheck,
  Trash2
} from 'lucide-react';
import {
  deleteBooking,
  getBookings,
  markBookingCompleted
} from '../api/client.js';
import BookingActivityChart from '../components/admin/BookingActivityChart.jsx';
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
import { Input } from '../components/ui/input.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../components/ui/select.jsx';
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
  const isCompleted = status === 'Completed';

  return (
    <Badge
      className={
        isCompleted
          ? 'rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
          : 'rounded-full bg-amber-100 text-amber-700 ring-1 ring-amber-200'
      }
    >
      {status}
    </Badge>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [activeActionId, setActiveActionId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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

  const filteredBookings = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === 'all' || booking.status.toLowerCase() === statusFilter;
      const searchableText = [
        booking.customerName,
        booking.email,
        booking.phone,
        booking.service?.name,
        booking.address,
        booking.notes
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return matchesStatus && (!normalizedSearch || searchableText.includes(normalizedSearch));
    });
  }, [bookings, searchTerm, statusFilter]);

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
    const isCompleted = booking.status === 'Completed';
    const isBusy = activeActionId === booking._id;

    return (
      <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
        {isCompleted ? (
          <Button type="button" size="sm" variant="secondary" disabled className="rounded-full">
            <CheckCircle2 className="h-4 w-4" />
            Completed
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            onClick={() => handleComplete(booking._id)}
            disabled={isBusy}
            className="rounded-full"
          >
            <CheckCircle2 className="h-4 w-4" />
            Mark Complete
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              disabled={isBusy}
            >
              <Trash2 className="h-4 w-4" />
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

  const statCards = [
    {
      label: 'Total Bookings',
      value: stats.total,
      description: 'All customer requests',
      Icon: ClipboardList,
      accent: 'bg-cleanora-ink text-white'
    },
    {
      label: 'Pending Bookings',
      value: stats.pending,
      description: 'Need admin action',
      Icon: Clock3,
      accent: 'bg-amber-100 text-amber-700'
    },
    {
      label: 'Completed Bookings',
      value: stats.completed,
      description: 'Finished jobs',
      Icon: CheckCircle2,
      accent: 'bg-emerald-100 text-emerald-700'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-cleanora-porcelain px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-full bg-cleanora-mint/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-80 h-96 w-96 rounded-full bg-cleanora-mint/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-5 rounded-3xl border border-slate-200/70 bg-white/75 p-6 shadow-xl shadow-cleanora-ink/5 backdrop-blur-xl md:flex-row md:items-start lg:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-cleanora-mint">
                Dashboard
              </p>
              <span className="inline-flex items-center gap-2 rounded-full border border-cleanora-mint/20 bg-cleanora-mint/10 px-3 py-1 text-xs font-black text-cleanora-ink">
                <ShieldCheck className="h-3.5 w-3.5 text-cleanora-mint" />
                Admin Mode
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-cleanora-ink sm:text-4xl lg:text-5xl">
              Booking Management
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Review customer booking requests, track activity, and manage cleaning jobs.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={logout} className="rounded-full bg-white/80">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {statCards.map(({ label, value, description, Icon, accent }) => (
            <Card
              key={label}
              className="group rounded-2xl border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cleanora-ink/10"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                    <p className="mt-4 text-4xl font-black text-cleanora-ink">{value}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-500">{description}</p>
                  </div>
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${accent}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {status === 'loading' && (
          <div className="grid gap-4">
            <Card className="rounded-2xl border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-xl">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-44" />
                <Skeleton className="mt-2 h-4 w-72 max-w-full" />
                <Skeleton className="mt-6 h-[280px] w-full" />
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-xl">
              <CardContent className="p-6">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="mt-5 h-12 w-full" />
                <Skeleton className="mt-3 h-12 w-full" />
              </CardContent>
            </Card>
          </div>
        )}

        {status === 'error' && (
          <Card className="rounded-2xl border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-black text-cleanora-ink">Bookings could not be loaded</h3>
              <p className="mt-3 text-sm text-slate-600">
                {error || 'Please login again or check the backend server.'}
              </p>
            </CardContent>
          </Card>
        )}

        {status === 'success' && <BookingActivityChart bookings={bookings} />}

        {status === 'success' && (
          <Card className="overflow-hidden rounded-2xl border-slate-200/70 bg-white/80 shadow-xl shadow-cleanora-ink/5 backdrop-blur-xl">
            <div className="border-b border-slate-100 p-5 lg:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-cleanora-ink">Booking Queue</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Showing {filteredBookings.length} of {bookings.length} bookings
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:w-auto">
                  <div className="relative sm:w-80">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search customer, service, phone..."
                      className="h-11 rounded-full border-slate-200 bg-white/90 pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-11 rounded-full border-slate-200 bg-white/90 sm:w-44" aria-label="Filter bookings by status">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {filteredBookings.length === 0 ? (
              <CardContent className="p-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cleanora-mint/10 text-cleanora-mint">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-black text-cleanora-ink">No bookings found</h3>
                <p className="mt-3 text-sm text-slate-600">
                  New customer bookings will appear here.
                </p>
              </CardContent>
            ) : (
              <>
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader className="sticky top-0 bg-slate-50/90 backdrop-blur">
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
                      {filteredBookings.map((booking) => (
                        <TableRow key={booking._id} className="hover:bg-cleanora-mist/35">
                          <TableCell>
                            <p className="font-black text-cleanora-ink">{booking.customerName}</p>
                            <p className="mt-1 text-slate-600">{booking.email}</p>
                            <p className="mt-1 text-slate-600">{booking.phone}</p>
                          </TableCell>
                          <TableCell>
                            <p className="font-bold text-cleanora-ink">{booking.service?.name || 'Service removed'}</p>
                            <p className="mt-1 max-w-xs text-slate-500">{booking.notes || 'No notes'}</p>
                          </TableCell>
                          <TableCell className="text-slate-600">
                            <p className="font-semibold text-cleanora-ink">{formatDate(booking.date)}</p>
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
                  {filteredBookings.map((booking) => (
                    <Card key={booking._id} className="rounded-2xl border-slate-200/70 bg-white/90 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-black text-cleanora-ink">{booking.customerName}</h3>
                            <p className="mt-1 text-sm font-semibold text-slate-600">{booking.service?.name || 'Service removed'}</p>
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
              </>
            )}
          </Card>
        )}

        <p className="pb-2 text-center text-xs font-semibold text-slate-500">
          (c) 2026 Cleanora Admin Panel
        </p>
      </div>
    </section>
  );
}

export default AdminDashboard;
