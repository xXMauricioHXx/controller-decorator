const createRouteDecorator = (method: string): Function =>
  function (path: string, middlewares: Function[] = []): Function {
    return function (target: any, propertyName: string) {
      if (!target.routeConfigs) {
        target.routeConfigs = [];
      }
      const handle = target[propertyName];

      if (handle instanceof Function) {
        target.routeConfigs.push({
          path,
          method,
          middlewares,
          handle,
        });
      }
    };
  };
export const get = createRouteDecorator('get');

export const post = createRouteDecorator('post');

export const put = createRouteDecorator('put');

export const patch = createRouteDecorator('patch');

export const del = createRouteDecorator('delete');
