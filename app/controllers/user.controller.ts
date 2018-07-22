import { Request, Response, Router } from 'express';
import { IUserService } from '../services/user.service';

export default class UserController {
  public router: Router;

  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
    this.router = Router();
    this.init();
  }

  init = () => {
    this.router.post('/', this.post);
  }

  post = async(req: Request, res: Response) => {
    res.json(await this.userService.add(req.body));
  }
}
