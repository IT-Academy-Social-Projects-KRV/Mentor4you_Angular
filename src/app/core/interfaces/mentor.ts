export interface MentorCard {
  id: number;
  fullName: string;
  avatar: string;
  categoriesList: CategoriesList;
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
  // categories: Array<Category>;  // expecting a change in structure of the data
  categoriesList: CategoriesList;
  place: string;
  currency: string;
  rate: number;
  // groupServ: boolean;   // expecting a change in structure of the data
  groupServ: string;
  languagesList: Array<LanguagesList>;
  description: string;
  isAccountActivated: boolean;
}

export interface CategoriesList {
  categories: { id: number, name: string };
  currency: string;
  rate: number;
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
