import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const UpdateAverage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({
    providerFirstName: "",
    avgTotalAmountPaidPerBill: "",
    countOfEmployeeDateOfInjury: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9999/average/${id}`)
      .then((response) => {
        setInvoice(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the invoice:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedInvoice = {
      ...invoice,
      updatedAt: new Date().toISOString(),
    };

    axios
      .put(`http://localhost:9999/average/${id}`, updatedInvoice)
      .then((response) => {
        console.log("Invoice updated successfully:", response.data);
        alert("Invoice updated successfully!");
        navigate("/average-invoices");
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          const errors = error.response.data.errors;
          const errorMessagesObj = {};

          for (let key in errors) {
            errorMessagesObj[key] = errors[key].message;
          }

          setErrorMessages(errorMessagesObj);
        } else {
          console.error("Error updating the invoice:", error);
          alert("Error updating the invoice. Please try again.");
        }
      });
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
        <h1 className="mb-4">Edit Average Invoice</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="providerFirstName" className="form-label">
              Provider Name
            </label>
            <input
              type="text"
              className="form-control"
              id="providerFirstName"
              name="providerFirstName"
              value={invoice.providerFirstName}
              onChange={handleInputChange}
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
              name="avgTotalAmountPaidPerBill"
              value={invoice.avgTotalAmountPaidPerBill}
              onChange={handleInputChange}
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
              name="countOfEmployeeDateOfInjury"
              value={invoice.countOfEmployeeDateOfInjury}
              onChange={handleInputChange}
              required
            />
            {errorMessages.countOfEmployeeDateOfInjury && (
              <div className="text-danger">
                {errorMessages.countOfEmployeeDateOfInjury}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Update Invoice
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateAverage;
