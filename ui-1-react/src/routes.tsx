import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { ProtectedRoute, SignInHandler, SignOutHandler } from './components/auth';
import { HomePage, StatsPage, UserProfilePage } from './pages'

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
        <Route path="" element={<HomePage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="user" element={<UserProfilePage />} />
        <Route path="*" element={<Navigate to="" />} />
      </Route>
    </Routes >
  </>

}