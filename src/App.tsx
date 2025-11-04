import React, { Suspense } from "react";
import "./App.css";

// Components
import Dashboard from "./components/Dashboard";
import Doctor from "./components/Doctor";
import Patients from "./components/Patients";
import Appointment from "./components/Appointment";

import {DashboardLayout} from "./components/DashboardLayout";

import Loading from "./components/Loading";

import Medication from "./components/Medication";

import AdminPage from "./components/AdminPage";


const App: React.FC = () => {
  return (
    <DashboardLayout>
      <Suspense fallback={<Loading />}>
       
        <Dashboard />
        <Doctor />
        <Patients />
        <Appointment />
        <Medication />
        
       
       
        <AdminPage />        {/* You can include dialogue components here if needed */}
      </Suspense>
    </DashboardLayout>
  );
};

export default App;
