import AverageInvoice from "../models/averageinvoice.model.js";

const getAllAverageInvoice = async (req, res, next) => {
  try {
    const allAverageInvoice = await AverageInvoice.find();
    res.status(200).json(allAverageInvoice);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createAverageInvoice = async (req, res) => {
  try {
    console.log(req.body);
    const newAverageInvoice = new AverageInvoice(req.body);
    const averageInvoice = await newAverageInvoice.save();
    res.json(newAverageInvoice);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getOneAverageInvoice = async (req, res) => {
  try {
    const foundAverageInvoice = await AverageInvoice.findById(req.params.id);
    res.json(foundAverageInvoice);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const updateOneAverageInvoiceById = async (req, res, next) => {
  const { id } = req.params;
  const options = {
    new: true,
    runValidators: true,
  };
  try {
    const updatedAverageInvoice = await AverageInvoice.findByIdAndUpdate(id, req.body, options);

    res.status(200).json(updatedAverageInvoice);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteOneAverageInvoice = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedAverageInvoice = await AverageInvoice.findByIdAndDelete(id);
    res.status(200).json(deletedAverageInvoice);
  } catch (error) {
    res.status(400).json(error);
  }
};

// New function to handle saving selected invoices
const saveSelectedInvoices = async (req, res) => {
  try {
    const records = req.body;

    // Insert multiple records into the database
    const insertedRecords = await AverageInvoice.insertMany(
      records.map((record) => ({
        providerFirstName: record.providerName,
        avgTotalAmountPaidPerBill: record.avgAmountPaid, 
        countOfEmployeeDateOfInjury: record.injuryCount, 
        employeeMailingCity: "Dallas", 
      }))
    );

    res.status(201).json(insertedRecords);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving data", error });
  }
};

// In your controller file
const deleteAllAverageInvoices = async (req, res) => {
  console.log("Hello", req.body);
  try {
    await AverageInvoice.deleteMany({});
    res.status(200).json({ message: "All records deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting all records", error });
  }
};

// Export the new function
export {
  createAverageInvoice,
  getOneAverageInvoice,
  updateOneAverageInvoiceById,
  deleteOneAverageInvoice,
  getAllAverageInvoice,
  saveSelectedInvoices,
  deleteAllAverageInvoices, // Add this line
};
