export interface Mentor {
  id: number;
  name: string;
  img: string;
  category: Array<string>;
  rating?: number;
}

export interface MentorDataFilter {
  id: number;
  name: string;
}
