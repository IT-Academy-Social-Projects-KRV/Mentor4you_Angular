export interface Mentee {
    id?: number;
    name: string;
    img?: string;
  }

export interface MenteeProfile{
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    socialMap: {
      PhoneNumFirst: string,
      Telegram: string,
      LinkedIn: string,
      Skype: string,
      GitHub: string
    }
}