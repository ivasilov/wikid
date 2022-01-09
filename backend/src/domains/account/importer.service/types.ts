import { RequestContext } from '../../../app';

export type TransformInput = {
  data: string;
  pages: { id: string; name: string }[];
  userId: string;
};

export interface Importer {
  transform: (ctx: RequestContext, i: TransformInput) => Promise<any>;
}
