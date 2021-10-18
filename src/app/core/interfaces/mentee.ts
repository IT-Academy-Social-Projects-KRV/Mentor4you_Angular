export interface Mentee {
    id: number;
    name: string;
    secondName: string;
    avatar?: string;
  }

export interface MenteeProfile{
    id?: number;
    avatar?: string;
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