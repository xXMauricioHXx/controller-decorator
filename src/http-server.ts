import express, { Router } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import compression from "compression";
import env from "./env";
import { UserController, Controller, RouteConfig } from "./controllers";

export class HttpServer {
  private loadControllers(): Controller[] {
    return [new UserController()];
  }

  private buildRoutes(router: Router): Router {
    this.loadControllers().forEach((controller) => {
      if (!controller.routeConfigs) {
        return;
      }

      const { routeConfigs } = controller;

      routeConfigs?.forEach((routeConfig: RouteConfig) => {
        const { handle, method, middlewares, path } = routeConfig;

        const jobs: any = middlewares.length
          ? [...middlewares, handle]
          : [handle];

        switch (method) {
          case "get":
            router.get(path, jobs);
            break;
          case "post":
            router.post(path, jobs);
            break;
          case "put":
            router.put(path, jobs);
            break;
          case "patch":
            router.patch(path, jobs);
            break;
          case "delete":
            router.delete(path, jobs);
            break;
          default:
            break;
        }
      });
    });
    return router;
  }

  start(): void {
    const app = express();
    const router = Router({ mergeParams: true });

    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const buildedRoutes = this.buildRoutes(router);
    app.use(buildedRoutes);

    app.use(
      "*",
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res
          .status(404)
          .send({ code: "PAGE_NOT_FOUND", message: "Page not found" });
      }
    );

    app.listen(env.port, () => {
      console.log(`HTTP server running on http://localhost:${env.port}`);
    });
  }
}
