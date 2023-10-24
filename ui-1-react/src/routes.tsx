import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { ProtectedRoute } from './components/auth';
import { Main, SignIn, SignOut, Stats, UserProfile } from './pages'

export const AppRoutes = () => {
  return <>
    <Routes>
      <Route path="signin" element={<SignIn />} />
      <Route path="signout" element={<SignOut />} />
      <Route path="/"
        element={
          <ProtectedRoute>
            <Layout children={<Outlet />} />
          </ProtectedRoute>
        }>
        <Route path="" element={<Main />} />
        <Route path="stats" element={<Stats />} />
        <Route path="user" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="" />} />
      </Route>
    </Routes >
  </>

}