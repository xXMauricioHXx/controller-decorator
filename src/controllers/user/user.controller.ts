import { NextFunction, Request, Response } from 'express';
import { Controller } from '../controller';
import { get } from '../../decorators/http';

export class UserController extends Controller {
  @get('/user')
  list(req: Request, res: Response, next: NextFunction) {
    return res.send([{ id: 1, name: 'Olá mundo' }]);
  }
}
