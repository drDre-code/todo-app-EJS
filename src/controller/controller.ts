import { Request, Response } from 'express';
import Joi from 'joi';



export const errorHandle = (req: Request, res: Response) => {
  res.status(404).send('Invalid Url');
};
