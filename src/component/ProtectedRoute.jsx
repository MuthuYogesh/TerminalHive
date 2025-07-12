import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  return currentUser ? children : <Navigate to="/" replace />;
}
