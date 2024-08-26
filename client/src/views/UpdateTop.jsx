import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; 

const UpdateTop = () => {
  const { id } = useParams(); 
  const [invoice, setInvoice] = useState({
    referringProviderLastName: "",
    employeeDateOfBirth: "",
    employeeDateOfInjury: "",
    employeeMailingCity: "",
    totalAmountPaidPerBill: "",
    billId: "",
  });
  const [errorMessages, setErrorMessages] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9999/largest/${id}`)
      .then((response) => {
        const fetchedInvoice = response.data;

       
        const formattedInvoice = {
          ...fetchedInvoice,
          employeeDateOfBirth: fetchedInvoice.employeeDateOfBirth
            ? new Date(fetchedInvoice.employeeDateOfBirth)
                .toISOString()
                .split("T")[0]
            : "",
          employeeDateOfInjury: fetchedInvoice.employeeDateOfInjury
            ? new Date(fetchedInvoice.employeeDateOfInjury)
                .toISOString()
                .split("T")[0]
            : "",
        };

        setInvoice(formattedInvoice);
      })
      .catch((error) => {
        console.error("Error fetching the invoice:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedInvoice = {
      ...invoice,
      updatedAt: new Date().toISOString(), 
    };

    try {
      await axios.put(`http://localhost:9999/largest/${id}`, updatedInvoice);
      console.log("Invoice updated successfully:", updatedInvoice);
      alert("Invoice updated successfully!");
      navigate("/top-invoices"); 
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        const errorMessagesObj = {};

        
        for (let key in errors) {
          errorMessagesObj[key] = errors[key].message;
        }

        setErrorMessages(errorMessagesObj);
      } else {
        alert("Error updating the invoice. Please try again.");
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
        <h1 className="mb-4">Edit Top Invoice</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="referringProviderLastName" className="form-label">
              Referring Provider Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="referringProviderLastName"
              name="referringProviderLastName"
              value={invoice.referringProviderLastName}
              onChange={handleInputChange}
              required
            />
            {errorMessages.referringProviderLastName && (
              <div className="text-danger">
                {errorMessages.referringProviderLastName}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="employeeDateOfBirth" className="form-label">
              Employee Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="employeeDateOfBirth"
              name="employeeDateOfBirth"
              value={invoice.employeeDateOfBirth}
              onChange={handleInputChange}
              required
            />
            {errorMessages.employeeDateOfBirth && (
              <div className="text-danger">
                {errorMessages.employeeDateOfBirth}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="employeeDateOfInjury" className="form-label">
              Employee Date of Injury
            </label>
            <input
              type="date"
              className="form-control"
              id="employeeDateOfInjury"
              name="employeeDateOfInjury"
              value={invoice.employeeDateOfInjury}
              onChange={handleInputChange}
              required
            />
            {errorMessages.employeeDateOfInjury && (
              <div className="text-danger">
                {errorMessages.employeeDateOfInjury}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="employeeMailingCity" className="form-label">
              Employee Mailing City
            </label>
            <input
              type="text"
              className="form-control"
              id="employeeMailingCity"
              name="employeeMailingCity"
              value={invoice.employeeMailingCity}
              onChange={handleInputChange}
              required
            />
            {errorMessages.employeeMailingCity && (
              <div className="text-danger">
                {errorMessages.employeeMailingCity}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="totalAmountPaidPerBill" className="form-label">
              Total Amount Paid Per Bill
            </label>
            <input
              type="number"
              className="form-control"
              id="totalAmountPaidPerBill"
              name="totalAmountPaidPerBill"
              value={invoice.totalAmountPaidPerBill}
              onChange={handleInputChange}
              required
            />
            {errorMessages.totalAmountPaidPerBill && (
              <div className="text-danger">
                {errorMessages.totalAmountPaidPerBill}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="billId" className="form-label">
              Bill ID
            </label>
            <input
              type="text"
              className="form-control"
              id="billId"
              name="billId"
              value={invoice.billId}
              onChange={handleInputChange}
              required
            />
            {errorMessages.billId && (
              <div className="text-danger">{errorMessages.billId}</div>
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

export default UpdateTop;
