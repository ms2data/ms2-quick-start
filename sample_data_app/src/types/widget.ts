export type Widget = {
  id: string;
  server: string;
  projectName: string;
  packageName: string;
  modelPath: string;
  query: string;
  title?: string;
  layout: {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    static?: boolean;
  };
  locked: boolean;
};
