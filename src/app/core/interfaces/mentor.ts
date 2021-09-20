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
  firstName: string;
  lastName: string;
  avatar: string;
  // email: string;
  // phoneNumber: string;
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
