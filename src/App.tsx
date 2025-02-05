import { Route, Routes } from 'react-router';
import './App.css'
import Landing from './Pages/Landing/Landing';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Register/Register';
import AuthLayout from './Layouts/AuthLayout';
import RegisterRep from './Pages/RegisterRep/RegisterRep';
import RegisterMember from './Pages/RegisterMember/RegisterMember';
import Dashboard from './Pages/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Success from './Pages/Success/Success';
import ClassDashboard from './Pages/ClassDashboard/ClassDashboard';

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Landing />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* 
      <Route
        path="/success"
        element={
          <PrivateRoute>
            <Success />
          </PrivateRoute>
        }
      /> */}

      <Route path="/success" element={<Success />} />
      <Route path="/class-dashboard" element={<ClassDashboard />} />

      <Route
        path="/success"
        element={
          <PrivateRoute>
            <ClassDashboard />
          </PrivateRoute>
        }
      />

      {/* Auth Pages */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
        <Route path="register/class-rep" element={<RegisterRep />} />
        <Route path="register/class-member" element={<RegisterMember />} />
      </Route>

      {/* Class Representative Pages */}
      <Route path="class-rep">
        {/* <Route path="create" element={<CreateClass />} /> */}
        {/* <Route path="manage" element={<ManageClass />} /> */}
      </Route>

      {/* Class Member Pages */}
      <Route path="class-member">
        {/* <Route path="join" element={<JoinClass />} /> */}
        {/* <Route path="profile" element={<Profile />} /> */}
      </Route>
    </Routes>
  );
}

export default App
  