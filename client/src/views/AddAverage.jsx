import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; // Import the Navbar component

const AddAverage = () => {
  const [providerFirstName, setProviderFirstName] = useState("");
  const [avgTotalAmountPaidPerBill, setAvgTotalAmountPaidPerBill] =
    useState("");
  const [countOfEmployeeDateOfInjury, setCountOfEmployeeDateOfInjury] =
    useState("");
  const [errorMessages, setErrorMessages] = useState({}); // State to hold error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newInvoice = {
      providerFirstName,
      avgTotalAmountPaidPerBill,
      countOfEmployeeDateOfInjury,
      employeeMailingCity: "Dallas", // Set employeeMailingCity as "Dallas"
    };

    try {
      await axios.post("http://localhost:9999/average", newInvoice);
      alert("Invoice added successfully!");
      navigate("/average-invoices"); // Redirect to the average invoices page
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

  const handleNavigateAverageInvoices = () => {
    navigate("/average-invoices");
  };

  return (
    <>
      <Navbar>
        <button
          className="btn btn-success"
          onClick={handleNavigateAverageInvoices}
        >
          Saved Searches for Average Invoices
        </button>
      </Navbar>
      <div className="container">
        <h1 className="mb-4">Add Average Invoice</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="providerFirstName" className="form-label">
              Provider Name
            </label>
            <input
              type="text"
              className="form-control"
              id="providerFirstName"
              value={providerFirstName}
              onChange={(e) => setProviderFirstName(e.target.value)}
              required
            />
            {errorMessages.providerFirstName && (
              <div className="text-danger">
                {errorMessages.providerFirstName}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="avgTotalAmountPaidPerBill" className="form-label">
              Average Total Amount Paid Per Bill
            </label>
            <input
              type="number"
              className="form-control"
              id="avgTotalAmountPaidPerBill"
              value={avgTotalAmountPaidPerBill}
              onChange={(e) => setAvgTotalAmountPaidPerBill(e.target.value)}
              required
            />
            {errorMessages.avgTotalAmountPaidPerBill && (
              <div className="text-danger">
                {errorMessages.avgTotalAmountPaidPerBill}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="countOfEmployeeDateOfInjury" className="form-label">
              Count of Employee Date of Injury
            </label>
            <input
              type="number"
              className="form-control"
              id="countOfEmployeeDateOfInjury"
              value={countOfEmployeeDateOfInjury}
              onChange={(e) => setCountOfEmployeeDateOfInjury(e.target.value)}
              required
            />
            {errorMessages.countOfEmployeeDateOfInjury && (
              <div className="text-danger">
                {errorMessages.countOfEmployeeDateOfInjury}
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

export default AddAverage;
