import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const navigate = useNavigate();

  const handleNavigateTopInvoices = () => {
    navigate("/top-invoices");
  };

  const handleNavigateAverageInvoices = () => {
    navigate("/average-invoices");
  };

  useEffect(() => {
    axios
      .get("https://data.texas.gov/resource/mzi7-5ajk.json")
      .then((response) => {
        const filtered = response.data.filter(
          (item) =>
            item.employee_mailing_city &&
            item.employee_mailing_city.toLowerCase() === "dallas"
        );
        setData(response.data);
        setFilteredData(filtered);
        setTableData(filtered);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSelectChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);

    if (selected === "top") {
      const groupedData = filteredData.reduce((acc, item) => {
        const providerName = item.referring_provider_last_name;
        if (
          !acc[providerName] ||
          parseFloat(item.total_amount_paid_per_bill) >
            parseFloat(acc[providerName].total_amount_paid_per_bill)
        ) {
          acc[providerName] = item;
        }
        return acc;
      }, {});

      const topInvoicesData = Object.values(groupedData);
      setTableData(topInvoicesData);
    } else if (selected === "largest") {
      const groupedData = filteredData.reduce((acc, item) => {
        const providerName = item.referring_provider_last_name;
        if (!acc[providerName]) {
          acc[providerName] = {
            providerName,
            totalAmountPaid: 0,
            totalBills: 0,
            injuryCount: 0,
          };
        }
        acc[providerName].totalAmountPaid += parseFloat(
          item.total_amount_paid_per_bill || 0
        );
        acc[providerName].totalBills += 1;
        acc[providerName].injuryCount += 1;
        return acc;
      }, {});

      const largestInvoicesData = Object.values(groupedData).map(
        (provider) => ({
          providerName: provider.providerName,
          avgAmountPaid: (
            provider.totalAmountPaid / provider.totalBills
          ).toFixed(2),
          injuryCount: provider.injuryCount,
        })
      );

      setTableData(largestInvoicesData);
    }
  };

  const handleCheckboxChange = (event, row) => {
    if (event.target.checked) {
      setSelectedRecords((prev) => [...prev, row]);
    } else {
      setSelectedRecords((prev) => prev.filter((record) => record !== row));
    }
  };

  const handleSaveSearch = () => {
    console.log("Saved search:", selectedOption);
    console.log("Selected Records:", selectedRecords);

    if (selectedOption === "top") {
      // Save selected records to the database
      axios
        .post(
          "http://localhost:9999/largest/save-selected-invoices",
          selectedRecords
        )
        .then((response) => {
          console.log("Records saved successfully:", response.data);
          alert("Records saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving records:", error);
          alert("Error saving records. Please try again.");
        });
    } else if (selectedOption === "largest") {
      axios
        .post(
          "http://localhost:9999/average/save-selected-invoices",
          selectedRecords
        )
        .then((response) => {
          console.log("Records saved successfully:", response.data);
          alert("Records saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving records:", error);
          alert("Error saving records. Please try again.");
        });
    }
  };

  return (
    <>
      <Navbar>
        <button className="btn btn-success" onClick={handleNavigateTopInvoices}>
          Saved Searches for Top Invoices
        </button>

        <button
          className="btn btn-secondary"
          onClick={handleNavigateAverageInvoices}
        >
          Saved Searches for Average Invoices
        </button>
      </Navbar>
      <div className="container">
        <div className="my-4">
          <select
            name="search"
            value={selectedOption}
            onChange={handleSelectChange}
            className="form-select"
          >
            <option value="" disabled>
              Please select
            </option>
            <option value="top">Top Invoices Per Provider</option>
            <option value="largest">
              Largest Average Invoice Per Provider
            </option>
          </select>
        </div>

        {selectedOption === "largest" && (
          <div className="table-responsive">
            <button
              className="btn btn-primary mb-3"
              style={{ float: "right" }}
              onClick={handleSaveSearch}
            >
              Save Search
            </button>
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Select</th>
                  <th>Provider First Name</th>
                  <th>Average Total Amount Paid Per Bill</th>
                  <th>Count of Employee Date of Injury</th>
                  <th>Employee Mailing City</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(event) => handleCheckboxChange(event, row)}
                      />
                    </td>
                    <td>{row.providerName}</td>
                    <td>{row.avgAmountPaid}</td>
                    <td>{row.injuryCount}</td>
                    <td>Dallas</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedOption === "top" && (
          <div className="table-responsive">
            <button
              className="btn btn-primary mb-3"
              style={{ float: "right" }}
              onClick={handleSaveSearch}
            >
              Save Search
            </button>
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Select</th>
                  <th>Referring Provider Last Name</th>
                  <th>Employee Date of Birth</th>
                  <th>Employee Date of Injury</th>
                  <th>Employee Mailing City</th>
                  <th>Total Amount Paid Per Bill</th>
                  <th>Bill ID</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(event) => handleCheckboxChange(event, row)}
                      />
                    </td>
                    <td>{row.referring_provider_last_name}</td>
                    <td>{row.employee_date_of_birth}</td>
                    <td>{row.employee_date_of_injury}</td>
                    <td>{row.employee_mailing_city}</td>
                    <td>{row.total_amount_paid_per_bill}</td>
                    <td>{row.bill_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
