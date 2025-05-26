
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout";
import Dashboard from "./index";
import Patients from "./Patients";
import Doctors from "./Doctors";
import Messages from "./Messages";
import Records from "./Records";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/records" element={<Records />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
