import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { Layout } from './layout';
import { Main, SignIn, SignOut, Stats } from './pages'
import { ProtectedRoute } from '../auth';

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
        <Route path="*" element={<Navigate to="" />} />
      </Route>
    </Routes >
  </>

}