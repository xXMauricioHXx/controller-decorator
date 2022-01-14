export type RouteConfig = {
  method: string;
  path: string;
  middlewares: Function[];
  handle: Function;
};

export abstract class Controller {
  routeConfigs?: RouteConfig[];
}
