import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.send('Get all transactions');
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  res.send(`Get transaction ID: ${id}`);
});

// tslint:disable-next-line:variable-name
export const TransactionController: Router = router;
