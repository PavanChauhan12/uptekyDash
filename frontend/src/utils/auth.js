export function saveToken(token) {
  localStorage.setItem('fb_token', token);
}
export function logout() {
  localStorage.removeItem('fb_token');
}
export function isLoggedIn() {
  return !!localStorage.getItem('fb_token');
}
