import LargestInvoice from "../models/largestinvoice.model.js";

const getAllLargestInvoice = async (req, res, next) => {
  try {
    const allLargestInvoice = await LargestInvoice.find();
    res.status(200).json(allLargestInvoice);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createLargestInvoice = async (req, res) => {
  try {
    console.log(req.body);
    const newLargestInvoice = new LargestInvoice(req.body);
    const savedInvoice = await newLargestInvoice.save();
    res.json(savedInvoice);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getOneLargestInvoice = async (req, res) => {
  try {
    const foundLargestInvoice = await LargestInvoice.findById(req.params.id);
    res.json(foundLargestInvoice);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const updateOneLargestInvoiceById = async (req, res, next) => {
  const { id } = req.params;
  const options = {
    new: true,
    runValidators: true,
  };
  try {
    const updatedLargestInvoice = await LargestInvoice.findByIdAndUpdate(
      id,
      req.body,
      options
    );

    res.status(200).json(updatedLargestInvoice);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteOneLargestInvoice = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedLargestInvoice = await LargestInvoice.findByIdAndDelete(id);
    res.status(200).json(deletedLargestInvoice);
  } catch (error) {
    res.status(400).json(error);
  }
};

const saveSelectedLargestInvoices = async (req, res) => {
  console.log("Hello", req.body);
  try {
    const records = req.body;

    const insertedRecords = await LargestInvoice.insertMany(
      records.map((record) => ({
        referringProviderLastName: record.referring_provider_last_name,
        employeeDateOfBirth: new Date(record.employee_date_of_birth),
        employeeDateOfInjury: new Date(record.employee_date_of_injury),
        employeeMailingCity: record.employee_mailing_city,
        totalAmountPaidPerBill: record.total_amount_paid_per_bill,
        billId: record.bill_id,
      }))
    );

    res.status(201).json(insertedRecords);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving data", error });
  }
};

const deleteAllLargestInvoices = async (req, res) => {
  try {
    await LargestInvoice.deleteMany({});
    res.status(200).json({ message: "All records deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting all records", error });
  }
};

export {
  createLargestInvoice,
  getOneLargestInvoice,
  updateOneLargestInvoiceById,
  deleteOneLargestInvoice,
  getAllLargestInvoice,
  saveSelectedLargestInvoices,
  deleteAllLargestInvoices,
};
