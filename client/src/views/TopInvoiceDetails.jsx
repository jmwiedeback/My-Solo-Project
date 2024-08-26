import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const TopInvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9999/largest/${id}`)
      .then((response) => {
        setInvoice(response.data);
        console.log("Invoice details:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoice details:", error);
      });
  }, [id]);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate("/top-invoices");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="mb-4">Invoice Details</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{invoice.referringProviderLastName}</h5>
            <p className="card-text">
              <strong>Bill ID:</strong> {invoice.billId}
            </p>
            <p className="card-text">
              <strong>Employee Date of Birth:</strong>{" "}
              {invoice.employeeDateOfBirth}
            </p>
            <p className="card-text">
              <strong>Employee Date of Injury:</strong>{" "}
              {invoice.employeeDateOfInjury}
            </p>
            <p className="card-text">
              <strong>Employee Mailing City:</strong>{" "}
              {invoice.employeeMailingCity}
            </p>
            <p className="card-text">
              <strong>Total Amount Paid Per Bill:</strong>{" "}
              {invoice.totalAmountPaidPerBill}
            </p>
            <p className="card-text">
              <strong>Created At:</strong> {invoice.createdAt}
            </p>
            <button className="btn btn-secondary" onClick={handleBack}>
              Back to List
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopInvoiceDetails;
