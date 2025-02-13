import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
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
import AdminResgistration from './Components/UserModules/Admin/RegistrationManagement/NewAdminRegistration/NewAdminRegistration';

import AppointmentList from './Components/OPDQ/AppointmentsList';
import DisplayBookedAppointment from './Components/OPDQ/DisplayBookedAppointment';
import AppointmentBookingForm from './Components/UserModules/Patients/AppointmentBookingForm/AppointmentBookingForm';

import PatientDashboard from './Components/UserModules/Patients/PatientDashboard/PatientDashboard';
import DoctorDashboard from './Components/UserModules/Doctor/DoctorDashboard/DoctorDashboard';
import PharmacyDashboard from './Components/UserModules/Pharmacists/Dashboard/PharmacyDashboard';
import ReceptionistDashBoard from './Components/UserModules/Admin/AdminDashboard/ReceptionistDashBoard/ReceptionistDashBoard';
import SystemAdministratorDashBoard from './Components/UserModules/Admin/AdminDashboard/SystemAdministratorDashBoard/SystemAdministratorDashBoard';
import HRManagerDashboard from './Components/UserModules/Admin/AdminDashboard/HRManagerDashboard/HRManagerDashboard';

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
import Patient_Bill from './Components/UserModules/Patients/PatientBills/PatientBills'

// import ExpiryUpdate from './Components/UserModules/Pharmacists/QuantityManagement/UpdateQuantity';

//Bad Management
import ApplyBed from './Components/BedManagement/BedApplication/ApplyBed';
import BedStatus from './Components/BedManagement/BedStatus/BedStatus';
import AddBed from './Components/BedManagement/AddBed/AddBed';
import EditBedPrices from './Components/BedManagement/EditBedPrices/EditBedPrices';
import AllDischargeBill from './Components/BedManagement/AllDischargeBill/AllDischargeBill';

import HospitalDemand from './Components/UserModules/Pharmacists/HospitalDemands/Hospital_demands';
import DemandDetails from './Components/UserModules/Pharmacists/DemandDetail/DemandDetail';
import InventoryRequest from './Components/UserModules/Doctor/Inventory_request/Inventory_request';


function MainApp() {
  const location = useLocation();
  const [userRole, setUserRole] = useState("guest"); // Default role
  const roleSet = useRef(false); // Track if a role has been assigned

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/admin-login" || location.pathname === "/patient-login" || location.pathname === "/doctor-login" || location.pathname === "/pharmacy-login") {
      setUserRole("guest");
      roleSet.current = false; // Reset tracking when on home page
    } else if (!roleSet.current) {
      if (location.pathname.includes("/receptionist-admin-dashboard" ) || location.pathname.includes("/systemadministrator-admin-dashboard") || location.pathname.includes("/hrmanager-admin-dashboard")) {
        setUserRole("admin");
      } else if (location.pathname.includes("/patient-dashboard")) {
        setUserRole("patient");
      } else if (location.pathname.includes("/doctor-dashboard")) {
        setUserRole("doctor");
      } else if (location.pathname.includes("/pharmacy-dashboard")) {
        setUserRole("pharmacist");
      }
      roleSet.current = true; // Mark that a role has been assigned
    }
  }, [location.pathname]);

  return ( 
    <>
     <Navbar userRole={userRole}/>
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
        <Route path="/admin-registration" element={<AdminResgistration/>} />

        {/* routes for appointment */}
        <Route path="/appointment-booking" element={<AppointmentBookingForm/>} />
        <Route path="/display-booked-appointment" element={<DisplayBookedAppointment/>} />
        <Route path="/appointment-list" element={<AppointmentList/>} />

        {/* routes for dashboard */}
        <Route path="/patient-dashboard" element={<PatientDashboard/>} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
        <Route path="/receptionist-admin-dashboard" element={<ReceptionistDashBoard/>} />
        <Route path="/systemadministrator-admin-dashboard" element={<SystemAdministratorDashBoard/>} />
        <Route path="/hrmanager-admin-dashboard" element={<HRManagerDashboard/>} />
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

      {/* BadManagement Routes */}
      <Route path="/bed-application" element={<ApplyBed />} />
      {/* <Route path="/status" element={<BedStatus />} /> */}
      <Route path="/bedManagement" element={<AddBed />} />
      <Route path="/editDefaultPrices" element={<EditBedPrices />} />
      <Route path="/allDischargeBill" element={<AllDischargeBill />} />
     
     {/*Doctor routes */}
     <Route path="add-patient-med" element={<Add_patient_med/>}></Route>

     {/* Patient routes */}
     <Route path="/patient/prescription/:id" element={<Prescription_portal />} />

     {/* Inventory demand managment */}
     <Route path="/Hospital-Demands" element={<HospitalDemand />}/>
      <Route path="/Demand/:id" element={<DemandDetails/>}/>
      <Route path="/inventory-request" element={<InventoryRequest />}></Route>

     {/* patient bill */}
<Route path='patient-bill' element={<Patient_Bill/>}></Route>
      </Routes>
      </>
  );
}

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
