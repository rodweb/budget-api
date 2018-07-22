import { Router, Request, Response } from 'express';

export default class TransactionController {
  public router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  public init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.get);
    this.router.post('/', this.post);
  }

  getAll(req: Request, res: Response) {
    res.send('Get all transactions');
  }

  get(req: Request, res: Response) {
    const { id } = req.params;

    res.send(`Get transaction ID: ${id}`);
  }

  post(req: Request, res: Response) {
    res.send(req.body);
  }
}
