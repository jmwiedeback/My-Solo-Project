import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const ShowTop = () => {
  const [topInvoices, setTopInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9999/largest")
      .then((response) => {
        setTopInvoices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top invoices:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9999/largest/${id}`)
      .then(() => {
        setTopInvoices((prev) => prev.filter((invoice) => invoice._id !== id));
        alert("Record deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
        alert("Error deleting record. Please try again.");
      });
  };

  const handleDeleteAll = () => {
    axios
      .delete("http://localhost:9999/largest")
      .then(() => {
        setTopInvoices([]);
        alert("All records deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting all records:", error);
        alert("Error deleting all records. Please try again.");
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-top/${id}`);
  };

  const handleAddInvoice = () => {
    navigate("/add-top");
  };

  const handleNavigateAverageInvoices = () => {
    navigate("/average-invoices");
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleViewDetails = (id) => {
    navigate(`/top-invoice-details/${id}`);
  };

  return (
    <>
      <Navbar>
        <div className="my-4 d-flex gap-3">
          <button
            className="btn btn-success"
            onClick={handleNavigateAverageInvoices}
          >
            Saved Searches for Average Invoices
          </button>
          <button className="btn btn-primary" onClick={handleNavigateHome}>
            Home
          </button>
        </div>
      </Navbar>
      <div className="container">
        <h1 className="mb-4">Top Invoices</h1>
        <button className="btn btn-danger mb-4" onClick={handleDeleteAll}>
          Delete All
        </button>
        <button className="btn btn-success mb-4" onClick={handleAddInvoice}>
          Add Invoice
        </button>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Bill ID</th>
              <th>Referring Provider Last Name</th>
              <th>Employee Date of Birth</th>
              <th>Employee Date of Injury</th>
              <th>Employee Mailing City</th>
              <th>Total Amount Paid Per Bill</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {topInvoices.map((invoice) => (
              <tr key={invoice._id}>
                <td>{invoice.billId}</td>
                <td
                  onClick={() => handleViewDetails(invoice._id)}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {invoice.referringProviderLastName}
                </td>
                <td>{invoice.employeeDateOfBirth}</td>
                <td>{invoice.employeeDateOfInjury}</td>
                <td>{invoice.employeeMailingCity}</td>
                <td>{invoice.totalAmountPaidPerBill}</td>
                <td>{invoice.createdAt}</td>
                <td>
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => handleEdit(invoice._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDelete(invoice._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowTop;
