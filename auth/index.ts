import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const {SECRET} = process.env

export interface UserRequest extends Request{
    token: string | JwtPayload
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try{
            if(req.header('Authorization')){
                console.log("hello world")
                const token = req.header('Authorization')?.replace('Bearer ', '');

                if(!token){
                    throw new Error();
                }
                else{
                    const decoded = await jwt.verify(token, SECRET || '');
                    (req as UserRequest).token = decoded;
                    next();
                }
            }
        }
        catch(error){
            res.status(401).send('Please authenticate')
        }
}

module.exports = auth