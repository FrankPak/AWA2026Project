import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
interface CustomRequest extends Request {
    user?: JwtPayload;
}
export declare const validateToken: (req: CustomRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateAdminToken: (req: CustomRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=validateToken.d.ts.map