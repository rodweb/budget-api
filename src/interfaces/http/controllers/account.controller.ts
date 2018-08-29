
import { Request, Response, Router } from 'express'
import { IAccountService } from '../services/account.service'

export default class AccountController {
  public router: Router

  // private accountService: IAccountService

  constructor(private accountService: IAccountService) {
    this.accountService = accountService
    this.router = Router()
    this.init()
  }

  init = () => {
    this.router.post('/', this.post)
  }

  post = async(req: Request, res: Response) => {
    res.json(await this.accountService.create(req.body))
  }
}
