import { HttpServer } from './http-server';

setImmediate(() => {
  const httpServer = new HttpServer();
  httpServer.start();
});
