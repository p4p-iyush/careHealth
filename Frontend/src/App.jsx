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

import PatientDashboard from './Components/UserModules/Patients/PatientDashboard/PatientDashboard';
import DoctorDashboard from './Components/UserModules/Doctor/DoctorDashboard/DoctorDashboard';
import AdminDashboard from './Components/UserModules/Admin/AdminDashboard/AdminDashboard';
import PharmacyDashboard from './Components/UserModules/Pharmacists/Dashboard/PharmacyDashboard';
// import MainDashboard from './Components/Dashboard/MainDashboard/MainDashboard';

//Inventory
import PatientList from './Components/UserModules/Pharmacists/PatientList/PatientList';
import PrescriptionDetails from './Components/UserModules/Pharmacists/Prescription/PrescriptionDetail';
import InventoryManagement from './Components/UserModules/Pharmacists/InventoryManagement/InventoryManagement';
import AddInventory from './Components/UserModules/Pharmacists/AddInventory/AddInventory';
import AboutToExpire from './Components/UserModules/Pharmacists/ExpiryManagement/AboutToExpire/AboutToExpire';
import UpdateQuantity from './Components/UserModules/Pharmacists/QuantityManagement/UpdateQuantity';
import ExpiredProduct from './Components/UserModules/Pharmacists/ExpiryManagement/ExpiredProduct/ExpiredProduct';
import ExpiryUpdate from './Components/UserModules/Pharmacists/ExpiryManagement/ExpiryUpdate/ExpiryUpdate';

//Doctor
import Add_patient_med from './Components/UserModules/Doctor/Doctor_add_patient/Add_patient_med'

// patient
import Prescription_portal from './Components/UserModules/Patients/PatientPrescription/PatientPrescrption'

// import ExpiryUpdate from './Components/UserModules/Pharmacists/QuantityManagement/UpdateQuantity';

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
        <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
        {/* <Route path ="/main-dashboard" element={<MainDashboard/>} /> */}

      {/* Routes for Pharmaciest */}
      <Route path="/patient-list" element={<PatientList/>} />
      <Route path="/prescription/:id" element={<PrescriptionDetails />} />
      <Route path="/inventory" element={<InventoryManagement />} />
      <Route path="/add-inventory" element={<AddInventory />} /> {/* Add AddMedicine route */}   
      <Route path="/about-to-expire" element={<AboutToExpire />} />
      <Route path="/Expired-product" element={<ExpiredProduct />} />
      <Route path="/ExpiryUpdate/:id" element={<ExpiryUpdate />} />

      <Route path="/update-quantity/:id" element={<UpdateQuantity />} />
      <Route path="/update-quantity/:inventory_id" component={UpdateQuantity} />
     
     {/*Doctor routes */}
     <Route path="add-patient-med" element={<Add_patient_med/>}></Route>

     {/* Patient routes */}
     <Route path="/patient/prescription/:id" element={<Prescription_portal />} />

      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
