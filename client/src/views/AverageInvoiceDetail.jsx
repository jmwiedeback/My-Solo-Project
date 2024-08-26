import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const AverageInvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9999/average/${id}`)
      .then((response) => {
        setInvoice(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoice details:", error);
      });
  }, [id]);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate("/average-invoices");
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="mb-4">Invoice Details</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{invoice.providerFirstName}</h5>
            <p className="card-text">
              <strong>Average Total Amount Paid Per Bill:</strong>{" "}
              {invoice.avgTotalAmountPaidPerBill}
            </p>
            <p className="card-text">
              <strong>Count of Employee Date of Injury:</strong>{" "}
              {invoice.countOfEmployeeDateOfInjury}
            </p>
            <p className="card-text">
              <strong>Employee Mailing City:</strong> Dallas
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

export default AverageInvoiceDetail;
