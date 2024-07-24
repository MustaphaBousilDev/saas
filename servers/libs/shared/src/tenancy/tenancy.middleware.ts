import { NextFunction, Response } from 'express';

export const TENANT_HEADER = 'x-tenant-id';

export function tenancyMiddleware(
  req: any,
  _res: Response,
  next: NextFunction,
): void {
  const header = req.headers[TENANT_HEADER] as string;
  req.tenantId = header?.toString() || null;
  next();
}
