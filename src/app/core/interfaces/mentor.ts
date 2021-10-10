export interface Mentor {
  id: number;
  name: string;
  img: string;
  category: Array<string>;
  rating?: number;
}

export interface MentorCooperation{
  coopStatus: string;
  mentor: MentorRespons;
}
export interface MentorRespons {
  id: number;
  name: string;
  secondName: string;
  img?: string;
}

export interface MentorDataFilter {
  id: number;
  name: string;
}
