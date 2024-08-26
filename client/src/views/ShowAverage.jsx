import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const ShowAverage = () => {
  const [averageInvoices, setAverageInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(5); // Number of invoices per page
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9999/average")
      .then((response) => {
        setAverageInvoices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching average invoices:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9999/average/${id}`)
      .then((response) => {
        setAverageInvoices((prev) =>
          prev.filter((invoice) => invoice._id !== id)
        );
        alert("Record deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
        alert("Error deleting record. Please try again.");
      });
  };

  const handleDeleteAll = () => {
    axios
      .delete("http://localhost:9999/average")
      .then((response) => {
        setAverageInvoices([]);
        alert("All records deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting all records:", error);
        alert("Error deleting all records. Please try again.");
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-average/${id}`);
  };

  const handleAdd = () => {
    navigate("/add-average");
  };

  const handleNavigateTopInvoices = () => {
    navigate("/top-invoices");
  };

  const handleNavigateHome = () => {
    navigate("/"); // Assuming the homepage route is "/"
  };

  // Calculate current invoices
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = averageInvoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleProviderClick = (id) => {
    navigate(`/average-invoice-detail/${id}`);
  };
  return (
    <>
      <Navbar>
        <div className="my-4 d-flex gap-3">
          <button
            className="btn btn-success"
            onClick={handleNavigateTopInvoices}
          >
            Saved Searches for Top Invoices
          </button>
          <button className="btn btn-primary" onClick={handleNavigateHome}>
            Home
          </button>
        </div>
      </Navbar>
      <div className="container">
        <h1 className="mb-4">Average Invoices</h1>
        <button className="btn btn-success mb-4" onClick={handleAdd}>
          Add Invoice
        </button>
        <button className="btn btn-danger mb-4" onClick={handleDeleteAll}>
          Delete All
        </button>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Provider Name</th>
              <th>Average Total Amount Paid Per Bill</th>
              <th>Count of Employee Date of Injury</th>
              <th>Employee Mailing City</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentInvoices.map((invoice, index) => (
              <tr key={index}>
                <td
                  className="text-primary cursor-pointer"
                  onClick={() => handleProviderClick(invoice._id)}
                >
                  {invoice.providerFirstName}
                </td>
                <td>{invoice.avgTotalAmountPaidPerBill}</td>
                <td>{invoice.countOfEmployeeDateOfInjury}</td>
                <td>Dallas</td>
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
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {[
                ...Array(
                  Math.ceil(averageInvoices.length / invoicesPerPage)
                ).keys(),
              ].map((number) => (
                <li key={number + 1} className="page-item">
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`page-link ${
                      currentPage === number + 1 ? "active" : ""
                    }`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ShowAverage;
