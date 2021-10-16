// import { Category } from "src/app/pages/account/components/chips-input/chips-input.component";

export interface MentorCard {
  id: number;
  fullName: string;
  avatar: string;
  categories: Array<Category>;
  // currency?: string;
  rating: number;
}

export interface MentorProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phoneNumFirst: string;
  categoriesList: Array<Category>;
  place: string;
  currency: string;
  rate: number;
  groupServ: string;
  languagesList: Array<Language>;
  description: string;
  isAccountActivated: boolean;
}

export interface Category {
  categories: { id: number, name: string };
  currency: string;
  rate: number;
}

export interface Certificate {
  name: string;
  description: string;
  link: string;
}

export interface Language {
  id: number;
  name: string;
}


// -------------------------------
export interface MentorDataFilter {
  id: number;
  name: string;
}
