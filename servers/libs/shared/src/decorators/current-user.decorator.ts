import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInfoDto } from '../dto/userInfo.dto';

const getCurrentUserByContext = (context: ExecutionContext): UserInfoDto => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  //cotext coming from graphQL
  const user = context.getArgs()[2]?.req.headers?.user;
  if (user) {
    return JSON.parse(user);
  }
};
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
