import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

import LoginPage from './Components/LoginPage/LoginPage';

import PatientLogin from './Components/AllLoginPages/PatientLogin/PatientLogin';
import AdminLogin from './Components/AllLoginPages/AdminLogin/AdminLogin';
import DoctorLogin from './Components/AllLoginPages/DoctorLogin/DoctorLogin';
import PharmacyLogin from './Components/AllLoginPages/PharmacyLogin/PharmacyLogin';

import PatientResgistration from './Components/UserModules/Patients/PatientRegistration/PatientRegistration';
import DoctorResgistration from './Components/UserModules/Admin/RegistrationManagement/DoctorRegistration/DoctorRegistration'
import PharmacyResgistration from './Components/UserModules/Admin/RegistrationManagement/PharmacyRegistration/PharmacyRegistration'

import AppointmentList from './Components/OPDQ/AppointmentsList';
import DisplayBookedAppointment from './Components/OPDQ/DisplayBookedAppointment';
import AppointmentBookingForm from './Components/UserModules/Patients/AppointmentBookingForm/AppointmentBookingForm';

import PatientDashboard from './Components/Dashboard/PatientDashboard/PatientDashboard';
import DoctorDashboard from './Components/Dashboard/DoctorDashboard/DoctorDashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard/AdminDashboard';
import PharmacyDashboard from './Components/Dashboard/PharmacyDashboard/PharmacyDashboard';
import MainDashboard from './Components/Dashboard/MainDashboard/MainDashboard';

import Add_patient_med from './Components/UserModules/Doctor/Add_patient_med';


function App() {
  return ( 
    <Router>
      <Navbar userRole={"admin"}/>
      <Routes>
        {/* routes for home */}
        <Route path="/" element={<LoginPage/>} />

        {/* routes for loginpage */}
        <Route path="/patient-login" element={<PatientLogin/>} />
        <Route path="/admin-login" element={<AdminLogin/>} />
        <Route path="/doctor-login" element={<DoctorLogin/>} />
        <Route path="/pharmacy-login" element={<PharmacyLogin/>} />

        {/* routes for registration */}
        <Route path="/patient-registration" element={<PatientResgistration/>} />
        <Route path="/doctor-registration" element={<DoctorResgistration/>} />
        <Route path="/pharmacy-registration" element={<PharmacyResgistration/>} />

        {/* routes for appointment */}
        <Route path="/appointment-booking" element={<AppointmentBookingForm/>} />
        <Route path="/display-booked-appointment" element={<DisplayBookedAppointment/>} />
        <Route path="/appointment-list" element={<AppointmentList/>} />

        {/* routes for dashboard */}
        <Route path="/patient-dashboard" element={<PatientDashboard/>} />
        <Route path="/doctor/:doctorId" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/pharmacy-dashboard" element={<PharmacyDashboard/>} />
        <Route path ="/main-dashboard" element={<MainDashboard/>} />

        {/* routes for doctor */}
        <Route path="/add-patient-med" element={<Add_patient_med/>} />

                
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
