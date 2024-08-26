import { Router } from "express";
import {
    createLargestInvoice,
    getOneLargestInvoice,
    updateOneLargestInvoiceById,
    deleteOneLargestInvoice,
    getAllLargestInvoice,
    saveSelectedLargestInvoices, 
    deleteAllLargestInvoices
} from "../controllers/largest.controller.js";

const LargestInvoiceRouter = Router();

LargestInvoiceRouter.route("/").post(createLargestInvoice).get(getAllLargestInvoice).delete(deleteAllLargestInvoices);

LargestInvoiceRouter
  .route("/:id")
  .put(updateOneLargestInvoiceById)
  .delete(deleteOneLargestInvoice)
  .get(getOneLargestInvoice);

  LargestInvoiceRouter.route("/save-selected-invoices").post(saveSelectedLargestInvoices); 

export default LargestInvoiceRouter;
