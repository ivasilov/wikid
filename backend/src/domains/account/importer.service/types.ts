export type TransformInput = {
  data: string;
  pages: { id: string; name: string }[];
  userId: string;
};

export interface Importer {
  transform: (i: TransformInput) => Promise<any>;
}
