export function getUser() {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem('user');
  window.location.href = '/login';
}
