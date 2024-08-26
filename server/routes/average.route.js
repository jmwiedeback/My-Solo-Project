import { Router } from "express";
import {
    createAverageInvoice,
    getOneAverageInvoice,
    updateOneAverageInvoiceById,
    deleteOneAverageInvoice,
    getAllAverageInvoice,
    saveSelectedInvoices,
    deleteAllAverageInvoices
} from "../controllers/average.controller.js";

const AverageInvoiceRouter = Router();

AverageInvoiceRouter.route("/").post(createAverageInvoice).get(getAllAverageInvoice).delete(deleteAllAverageInvoices);

AverageInvoiceRouter
  .route("/:id")
  .put(updateOneAverageInvoiceById)
  .delete(deleteOneAverageInvoice)
  .get(getOneAverageInvoice);

  AverageInvoiceRouter.route("/save-selected-invoices").post(saveSelectedInvoices); 

export default AverageInvoiceRouter;
