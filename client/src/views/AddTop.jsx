import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; // Import the Navbar component

const AddTop = () => {
  const [formData, setFormData] = useState({
    billId: "",
    referringProviderLastName: "",
    employeeDateOfBirth: "",
    employeeDateOfInjury: "",
    employeeMailingCity: "",
    totalAmountPaidPerBill: "",
  });
  const [errorMessages, setErrorMessages] = useState({}); // State to hold error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:9999/largest", formData);
      alert("Invoice added successfully!");
      navigate("/top-invoices"); // Navigate back to the list page or wherever appropriate
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        const errorMessagesObj = {};

        // Extract the error messages for each field
        for (let key in errors) {
          errorMessagesObj[key] = errors[key].message;
        }

        setErrorMessages(errorMessagesObj);
      } else {
        alert("Error adding invoice. Please try again.");
      }
    }
  };

  const handleNavigateTopInvoices = () => {
    navigate("/top-invoices");
  };

  return (
    <>
      <Navbar>
        <button className="btn btn-success" onClick={handleNavigateTopInvoices}>
          Saved Searches for Top Invoices
        </button>
      </Navbar>
      <div className="container">
        <h1 className="mb-4">Add Invoice</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Bill ID</label>
            <input
              type="text"
              className="form-control"
              name="billId"
              value={formData.billId}
              onChange={handleChange}
              required
            />
            {errorMessages.billId && (
              <div className="text-danger">{errorMessages.billId}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Referring Provider Last Name</label>
            <input
              type="text"
              className="form-control"
              name="referringProviderLastName"
              value={formData.referringProviderLastName}
              onChange={handleChange}
              required
            />
            {errorMessages.referringProviderLastName && (
              <div className="text-danger">
                {errorMessages.referringProviderLastName}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Employee Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="employeeDateOfBirth"
              value={formData.employeeDateOfBirth}
              onChange={handleChange}
              required
            />
            {errorMessages.employeeDateOfBirth && (
              <div className="text-danger">
                {errorMessages.employeeDateOfBirth}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Employee Date of Injury</label>
            <input
              type="date"
              className="form-control"
              name="employeeDateOfInjury"
              value={formData.employeeDateOfInjury}
              onChange={handleChange}
              required
            />
            {errorMessages.employeeDateOfInjury && (
              <div className="text-danger">
                {errorMessages.employeeDateOfInjury}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Employee Mailing City</label>
            <input
              type="text"
              className="form-control"
              name="employeeMailingCity"
              value={formData.employeeMailingCity}
              onChange={handleChange}
              required
            />
            {errorMessages.employeeMailingCity && (
              <div className="text-danger">
                {errorMessages.employeeMailingCity}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Total Amount Paid Per Bill</label>
            <input
              type="number"
              className="form-control"
              name="totalAmountPaidPerBill"
              value={formData.totalAmountPaidPerBill}
              onChange={handleChange}
              required
            />
            {errorMessages.totalAmountPaidPerBill && (
              <div className="text-danger">
                {errorMessages.totalAmountPaidPerBill}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Add Invoice
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTop;
