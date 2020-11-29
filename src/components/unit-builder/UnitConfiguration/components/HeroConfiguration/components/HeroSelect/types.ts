export type HeroGroup = {
  name: string;
  alternates: Alternate[];
};

export type Alternate = {
  id: string;
  releaseDate: string;
  title: string;
};
