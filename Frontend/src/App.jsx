// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar';
// import Footer from './Components/Footer/Footer';
// import LoginPage from './Components/LoginPage/LoginPage';
import AppointmentList from './Components/OPDQ/AppointmentsList';
import DisplayBookedAppointment from './Components/OPDQ/DisplayBookedAppointment';
import AppointmentBookingForm from './Components/UserModules/Patients/AppointmentBookingForm/AppointmentBookingForm';



function App() {
  return (
    <>
    {/* <AppointmentBookingForm/> */}
    <DisplayBookedAppointment/>
    <AppointmentList/>
    </>

    // <Router>
    //   <Navbar userRole={"admin"}/>
    //   <Routes>
    //     <Route path="/" element={<LoginPage/>} />
    //     {/* <Route path="/" element={<AppointmentManagment/>} /> */}
    //     {/* <Route path="/queue-management" element={<QueueManagement />} /> */}
    //   </Routes>
    //   <Footer />
    // </Router>
  );
}

export default App;
