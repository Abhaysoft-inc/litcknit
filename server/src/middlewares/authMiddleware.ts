import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export default (req: Request, res: Response, next: NextFunction) => {
    try {

        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "Unauthorised"
            });
        }

        if (!JWT_SECRET) {
            return res.status(500).json({ message: "internal server error" });
        }

        const token = auth.split(' ')[1] as string
        const payload = jwt.verify(token, JWT_SECRET);

        req.userId = payload.userId;
        req.email = payload.email;

        console.log(payload.email)

        return next();


    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        })


    }
}