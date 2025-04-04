import * as PaymentController from '../controllers/payment.controller.js';
import * as PaymentValidation from '../Schema/payment.schema.js';

import express from 'express';

const paymentRouter = express.Router();

paymentRouter
	.route('/:id')
	.get(PaymentController.getById)
	.delete(PaymentController.destroy);
paymentRouter
	.route('/')
	.get(PaymentController.getList)
	.post(PaymentValidation.validation, PaymentController.create);

export default paymentRouter;
