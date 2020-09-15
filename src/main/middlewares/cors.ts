import { Request, Response, NextFunction } from 'express';

const cors = (req: Request, res: Response, next: NextFunction) => {
  res.set('acess-control-allow-origin', '*');
  res.set('acess-control-allow-methods', '*');
  res.set('acess-control-allow-headers', '*');
  next();
};

export default cors;
