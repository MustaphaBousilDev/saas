import { NextFunction, Response } from 'express';

export const TENANT_HEADER = 'x-tenant-id';

export function tenancyMiddleware(
  req: any,
  _res: Response,
  next: NextFunction,
): void {
  const header = req.headers[TENANT_HEADER] as string;
  console.log('middleeware');
  console.log('header:', header);
  req.tenantId = header?.toString() || null;
  console.log('tenantId: ', req.tenantId);
  next();
}
