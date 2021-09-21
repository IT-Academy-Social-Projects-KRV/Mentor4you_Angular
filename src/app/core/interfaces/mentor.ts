export interface MentorCard {
  id: number;
  fullName: string;
  avatar: string;
  categories: Array<Category>;
  rating?: number;
}

export interface Category {
  title: string;
}

export interface MentorProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phoneNumberLink: string;
  categories: Array<Category>;
  place: string;
  rate: number;
  groupServices: boolean | null;
  languagesList: Array<string>;
  about: string;
}

// -------------------------------
export interface MentorDataFilter {
  id: number;
  name: string;
}
