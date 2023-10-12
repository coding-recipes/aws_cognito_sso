import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { Layout } from './layout';
import Main from '../pages/Root';
import SignIn from '../pages/SignIn';
import SignOut from '../pages/SignOut';
import Data from '../pages/Data';
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
        <Route path="data" element={<Data />} />
        <Route path="*" element={<Navigate to="" />} />
      </Route>
    </Routes >
  </>

}