import { model, Schema } from "mongoose";

const AverageInvoiceSchema = new Schema(
  {
    providerFirstName: {
      type: String,
      required: [true, "Provider First Name is required!"],
      minlength: [2, "Provider First Name must be at least 2 characters long!"],
      maxlength: [255, "Provider First Name must be less than 255 characters long!"],
    },
    avgTotalAmountPaidPerBill: {
      type: Number,
      required: [true, "Average Total Amount Paid Per Bill is required!"],
      min: [0, "Average Total Amount Paid Per Bill cannot be negative!"],
    },
    countOfEmployeeDateOfInjury: {
      type: Number,
      required: [true, "Count of Employee Date of Injury is required!"],
      min: [0, "Count of Employee Date of Injury cannot be negative!"],
    },
    employeeMailingCity: {
      type: String,
      required: [true, "Employee Mailing City is required!"],
      minlength: [2, "Employee Mailing City must be at least 2 characters long!"],
      maxlength: [255, "Employee Mailing City must be less than 255 characters long!"],
    },
  },
  { timestamps: true }
);

const AverageInvoice = model("AverageInvoice", AverageInvoiceSchema);
export default AverageInvoice;
