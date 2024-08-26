import { model, Schema } from "mongoose";

const LargestInvoiceSchema = new Schema(
  {
    referringProviderLastName: {
      type: String,
      required: [true, "Referring Provider Last Name is required!"],
      minlength: [2, "Referring Provider Last Name must be at least 2 characters long!"],
      maxlength: [255, "Referring Provider Last Name must be less than 255 characters long!"],
    },
    employeeDateOfBirth: {
      type: Date,
      required: [true, "Employee Date of Birth is required!"],
    },
    employeeDateOfInjury: {
      type: Date,
      required: [true, "Employee Date of Injury is required!"],
    },
    employeeMailingCity: {
      type: String,
      required: [true, "Employee Mailing City is required!"],
      minlength: [2, "Employee Mailing City must be at least 2 characters long!"],
      maxlength: [255, "Employee Mailing City must be less than 255 characters long!"],
    },
    totalAmountPaidPerBill: {
      type: Number,
      required: [true, "Total Amount Paid Per Bill is required!"],
      min: [0, "Total Amount Paid Per Bill cannot be negative!"],
    },
    billId: {
      type: String,
      required: [true, "Bill ID is required!"],
      unique: true, // Ensure Bill ID is unique
    },
  },
  { timestamps: true }
);

const LargestBilling = model("largestinvoice", LargestInvoiceSchema);
export default LargestBilling;
