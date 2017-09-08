
/// <reference types="node" />

import * as http from 'http';

declare function fastify(opts?: fastify.ServerOptions): fastify.FastifyInstance;

declare namespace fastify {

  type Plugin = (instance: FastifyInstance, opts: Object, callback?: (err?: Error) => void) => void

  type Middleware = (req: http.IncomingMessage, res: http.OutgoingMessage, callback?: (err?: Error) => void) => void

  type HTTPMethod = 'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'OPTIONS';
  
  type BeforeRequestHandler = (req: FastifyRequest, res: FastifyReply, done: (err: Error) => void) => void
  
  type RequestHandler = (req: FastifyRequest, res: FastifyReply) => void

  /**
   * fastify's wrapped version of node.js IncomingMessage
   */
  interface FastifyRequest {
    query: object,
    body: any,
    params: object,

    // TODO - logger and node types
    req: any
    log: any
  }

  /**
   * Response object that is used to build and send a http response
   */
  interface FastifyReply {
    code: (statusCode: number) => FastifyReply
    header: (name: string, value: any) => FastifyReply
    type: (contentType: string) => FastifyReply
    redirect: (statusCode: number, url: string) => FastifyReply
    serializer: (fn: Function) => FastifyReply
    send: (payload?: string|Array<any>|Object|Error|Promise<any>|ReadableStream) => FastifyReply 
    sent: boolean
  }

  interface LoggerOptions {
    // TODO - import pino types
    level: string
  }

  interface ServerOptions {
    logger: LoggerOptions,
    https: boolean
  }

  interface JSONSchema {
    // TODO - define/import JSONSchema types
    body?: Object
    querystring?: Object
    params?: Object
    response?: {
      [code: number]: Object
    }
  }

  /**
   * Optional configuration parameters for the route being created
   */
  interface RouteShorthandOptions {
    schema?: JSONSchema
    beforeHandler?: BeforeRequestHandler
  }

  /**
   * Route configuration options such as "url" and "method"
   */
  interface RouteOptions extends RouteShorthandOptions {
    method: HTTPMethod,
    url: string,
    handler?: RequestHandler
  }
  
  /**
   * Represents the fastify instance created by the factory function the module exports.
   */
  interface FastifyInstance {
    server: http.Server

    /**
     * Adds a route to the server
     */
    route(opts: RouteOptions): FastifyInstance

    /**
     * Defines a GET route with the given mount path, options, and handler
     */
    get(url: string, opts: RouteShorthandOptions, handler: RequestHandler): FastifyInstance

    /**
     * Defines a GET route with the given mount path and handler
     */
    get(url: string, handler: RequestHandler): FastifyInstance

    /**
     * Defines a PUT route with the given mount path, options, and handler
     */
    put(url: string, opts: RouteShorthandOptions, handler: RequestHandler): FastifyInstance

    /**
     * Defines a PUT route with the given mount path and handler
     */
    put(url: string, handler: RequestHandler): FastifyInstance

    /**
     * Defines a PATCH route with the given mount path, options, and handler
     */
    patch(url: string, opts: RouteShorthandOptions, handler: RequestHandler): FastifyInstance

    /**
     * Defines a PATCH route with the given mount path and handler
     */
    patch(url: string, handler: RequestHandler): FastifyInstance

    /**
     * Defines a POST route with the given mount path, options, and handler
     */
    post(url: string, opts: RouteShorthandOptions, handler: RequestHandler): FastifyInstance

    /**
     * Defines a POST route with the given mount path and handler
     */
    post(url: string, handler: RequestHandler): FastifyInstance

    /**
     * Defines a HEAD route with the given mount path, options, and handler
     */
    head(url: string, opts: RouteShorthandOptions, handler: RequestHandler): FastifyInstance

    /**
     * Defines a HEAD route with the given mount path and handler
     */
    head(url: string, handler: RequestHandler): FastifyInstance

    /**
     * Defines a DELETE route with the given mount path, options, and handler
     */
    delete(url: string, opts: RouteShorthandOptions, handler: RequestHandler): FastifyInstance

    /**
     * Defines a DELETE route with the given mount path and handler
     */
    delete(url: string, handler: RequestHandler): FastifyInstance

    /**
     * Defines a OPTIONS route with the given mount path, options, and handler
     */
    options(url: string, opts: RouteShorthandOptions, handler: RequestHandler): FastifyInstance

    /**
     * Defines a OPTIONS route with the given mount path and handler
     */
    options(url: string, handler: RequestHandler): FastifyInstance

    /**
     * Starts the server on the given port after all the plugins are loaded,
     * internally waits for the .ready() event. The callback is the same as the
     * Node core.
     */
    listen(port: number, hostname: string, backlog: number, callback?: (err: Error) => void): http.Server

    /**
     * Starts the server on the given port after all the plugins are loaded,
     * internally waits for the .ready() event. The callback is the same as the
     * Node core.
     */
    listen(port: number, hostname: string, callback?: (err: Error) => void): http.Server

    /**
     * Starts the server on the given port after all the plugins are loaded,
     * internally waits for the .ready() event. The callback is the same as the
     * Node core.
     */
    listen(port: number, callback?: (err: Error) => void): http.Server

    /**
     * Registers a listener function that is invoked when all the plugins have
     * been loaded. It receives an error parameter if something went wrong.
     */
    ready(readyListener?: () => void): void

    /**
     * Call this function to close the server instance and run the "onClose" callback
     */
    close(closeListener: () => void): void

    /**
     * Apply the given middleware to all incoming requests
     */
    use(middleware: Middleware): void

    /**
     * Apply the given middleware to routes matching the given path
     */
    use(path: string, middleware: Middleware): void

    /**
     * Registers a plugin or array of plugins on the server
     */
    register(plugin: Plugin|Array<Plugin>, RouteOptions, callback?: (err: Error) => void): FastifyInstance
  }
}

export = fastify;
