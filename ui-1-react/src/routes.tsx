import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { ProtectedRoute, SignInHandler, SignOutHandler } from './components/auth';
import { StatsPage, UserPage } from './pages'

export const AppRoutes = () => {
  return <>
    <Routes>
      <Route path="signin" element={<SignInHandler />} />
      <Route path="signout" element={<SignOutHandler />} />
      <Route path="/"
        element={
          <ProtectedRoute>
            <Layout children={<Outlet />} />
          </ProtectedRoute>
        }>
        <Route path="stats" element={<StatsPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="" element={<Navigate to="stats" />} />
        <Route path="*" element={<Navigate to="stats" />} />
      </Route>
    </Routes >
  </>

}