import { INestApplication } from '@nestjs/common';
//its work when we bootstrap our application , so that we set thisapplication and make it available to our each context when we need it
let app: INestApplication;

const setApp = (_app: INestApplication) => {
  console.log('APPss "##############"');
  app = _app;
};

export { app, setApp };
