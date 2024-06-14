import { AUTH_SERVICE } from '@app/shared';
import { ClientProxy } from '@nestjs/microservices';
import { app } from './app';
import { UnauthorizedException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export const authContext = async ({ req }) => {
  try {
    const authClient = app.get<ClientProxy>(AUTH_SERVICE);
    console.log('## fukcing here aurh context');
    console.log(req.headers.authentication);
    const user = await lastValueFrom(
      authClient.send('authenticate', {
        Authentication: req.headers?.authentication,
      }),
    );
    console.log('user', user);
    return { user };
  } catch (err) {
    throw new UnauthorizedException(err);
  }
};
