import { useState } from 'react'
import './App.css'
import Appointment from './Components/appointment/appointment'
import Display from './Components/OPDQ/display'
import AppointmentsList from './Components/OPDQ/AppointmentsList'
import AppointmentsList_test from './Components/OPDQ/appointlist_test'

function App() {

  return (
    <>
      <div className="main">
        <div className="container">
          <Appointment />
          <Display />
        </div>
        <AppointmentsList_test />
        {/* <AppointmentsList /> */}
      </div>
    </>
  )
}

export default App
