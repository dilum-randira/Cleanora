const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || 'API request failed');
    error.status = response.status;
    throw error;
  }

  return data;
}

export async function getServices() {
  const result = await apiRequest('/services');

  return Array.isArray(result) ? result : result.data || [];
}

export async function getReviews() {
  const result = await apiRequest('/reviews');

  return Array.isArray(result) ? result : result.data || [];
}

export async function createBooking(bookingData) {
  return apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData)
  });
}

export async function adminLogin(credentials) {
  return apiRequest('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
}

export async function getBookings(token) {
  const result = await apiRequest('/bookings', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return Array.isArray(result) ? result : result.data || [];
}

export async function markBookingCompleted(id, token) {
  return apiRequest(`/bookings/${id}/complete`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function deleteBooking(id, token) {
  return apiRequest(`/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export { API_BASE_URL };
