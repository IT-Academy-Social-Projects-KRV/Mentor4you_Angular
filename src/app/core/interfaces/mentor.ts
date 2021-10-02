export interface MentorCard {
  id: number;
  fullName: string;
  avatar: string;
  categories: Array<Category>;
  rating: number;
}

export interface MentorProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phoneNumberLink: string;
  // categories: Array<Category>;  // expecting a change in structure of the data
  category: Category;
  place: string;
  currency: string;
  rate: number;
  // groupServ: boolean;   // expecting a change in structure of the data
  groupServ: string;
  languagesList: Array<LanguagesList>;
  about: string;
}

export interface Category {
  title: string;
}

export interface LanguagesList {
  id: number;
  name: string;
}


// -------------------------------
export interface MentorDataFilter {
  id: number;
  name: string;
}
