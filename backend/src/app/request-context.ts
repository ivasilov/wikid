import { Request } from 'express';

/**
 * @description
 * The RequestContext holds information relevant to the current request, which may be
 * required at various points of the stack.
 *
 * It is a good practice to inject the RequestContext (using the {@link Ctx} decorator) into
 * _all_ resolvers & REST handlers, and then pass it through to the service layer.
 *
 * This allows the service layer to access information about the current user, the active language,
 * the active Channel, and so on. In addition, the {@link TransactionalConnection} relies on the
 * presence of the RequestContext object in order to correctly handle per-request database transactions.
 *
 * @example
 * ```TypeScript
 * \@Query()
 * myQuery(\@Ctx() ctx: RequestContext) {
 *   return this.myService.getData(ctx);
 * }
 * ```
 */
export class RequestContext {
  private readonly _req?: Request;

  /**
   * @internal
   */
  constructor(options: { req?: Request }) {
    const { req } = options;
    this._req = req;
  }

  /**
   * @description
   * The raw Express request object.
   */
  get req(): Request | undefined {
    return this._req;
  }
}
