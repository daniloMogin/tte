import { Request, Response, NextFunction } from 'express';

import UserModel from '../models/user.server.model';

class IndexController {
  renderIndex = (req: Request, res: Response) => {
    console.log('=================================================');
    console.log('Rendering index... (index.server.controller.ts 34)');
    console.log('=================================================');
    res.render('index', {
      title: 'Be SMART DOIT',
      user: JSON.stringify(req.user)
    });
  };
}
export = IndexController;
