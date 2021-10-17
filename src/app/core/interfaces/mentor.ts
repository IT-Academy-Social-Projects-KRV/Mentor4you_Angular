export interface MentorCard {
  id: number;
  fullName: string;
  avatar: string;
  categories: Array<Category>;
  currency?: string;
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
  rate: number;
  place?: string;
  currency: string;
  groupServ: string;
  languagesList?: Array<Language>;
  description: string;
  telegram: string;
  skype: string;
  linkedIn: string;
  gitHub: string;
  isAccountActivated: boolean;
  online: boolean;
  offlineOut: boolean;
  offlineIn: boolean;
  certificates: Array<Certificate>;
  languages: Array<Language>;
  cities: Array<City>;
  rating: number;
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

export interface Language {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}
