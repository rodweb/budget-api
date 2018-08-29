import { Router, Request, Response } from 'express'
import { ITransactionService } from '../services/transaction.service'

export default class TransactionController {
  public router: Router
  constructor(private transactionService: ITransactionService) {
    this.router = Router()
    this.init()
  }

  public init() {
    this.router.get('/', this.getAll)
    this.router.get('/:id', this.get)
    this.router.post('/', this.post)
  }

  getAll(req: Request, res: Response) {
    res.send('Get all transactions')
  }

  get(req: Request, res: Response) {
    const { id } = req.params

    res.send(`Get transaction ID: ${id}`)
  }

  post = async(req: Request, res: Response) => {
    res.json(await this.transactionService.create(req.body))
  }
}
