import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: "Não autenticado." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, role: string };

      req.user = decoded.userId as any;  // armazene o userId no objeto req para uso posterior
      req.role = decoded.role as any;  // armazene a role no objeto req para uso posterior

      next();
    } catch (error) {
      res.status(401).json({ message: "Token inválido ou expirado." });
    }
};

