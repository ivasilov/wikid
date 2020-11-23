export type TransformInput = {
  data: string;
  userId: string;
};

export interface Importer {
  transform: (i: TransformInput) => void;
}
