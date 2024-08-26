import React from "react";
import "./App.css";
import Login from "./views/Login";
import Home from "./views/Home";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./views/ProtectedRoute";
import PublicRoute from "./views/PublicRoute";
import TopInvoices from "./views/ShowTop";
import AverageInvoices from "./views/ShowAverage";
import UpdateAverage from "./views/UpdateAverage";
import UpdateTop from "./views/UpdateTop";
import AddTop from "./views/AddTop";
import AddAverage from "./views/AddAverage";
import AverageInvoiceDetail from "./views/AverageInvoiceDetail";
import TopInvoiceDetails from "./views/TopInvoiceDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute element={<Login />} />} />

      <Route path="/" element={<ProtectedRoute element={<Home />} />} />
      <Route
        path="/top-invoices"
        element={<ProtectedRoute element={<TopInvoices />} />}
      />
      <Route
        path="/average-invoices"
        element={<ProtectedRoute element={<AverageInvoices />} />}
      />
      <Route
        path="/edit-average/:id"
        element={<ProtectedRoute element={<UpdateAverage />} />}
      />
      <Route
        path="/edit-top/:id"
        element={<ProtectedRoute element={<UpdateTop />} />}
      />
      <Route
        path="/add-top"
        element={<ProtectedRoute element={<AddTop />} />}
      />
      <Route
        path="/add-average"
        element={<ProtectedRoute element={<AddAverage />} />}
      />
      <Route
        path="/average-invoice-detail/:id"
        element={<ProtectedRoute element={<AverageInvoiceDetail />} />}
      />
      <Route
        path="/top-invoice-details/:id"
        element={<ProtectedRoute element={<TopInvoiceDetails />} />}
      />
    </Routes>
  );
};

export default App;
