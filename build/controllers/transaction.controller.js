"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (req, res, next) => {
    res.send('Get all transactions');
});
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    res.send(`Get transaction ID: ${id}`);
});
// tslint:disable-next-line:variable-name
exports.TransactionController = router;
