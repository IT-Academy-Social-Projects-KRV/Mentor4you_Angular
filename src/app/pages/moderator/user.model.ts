export class User {
    public id!:number;
    public role!:string;
    public email!:string;
    public password!:string;
    public first_name!:string;
    public last_name!:string;
    public avatar!:string;
    public registration_date!: string;
    public status!: boolean;
    public ban!: boolean | null;

    constructor(
        id:number, 
        role:string, 
        email:string, 
        password:string, 
        first_name:string, 
        last_name:string, 
        avatar:string, 
        registration_date:string, 
        status:boolean,
        ban: boolean | null ) {            
        this.id = id;
        this.role = role;
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.avatar = avatar;
        this.registration_date = registration_date;
        this.status = status;
        this.ban = ban;
    }
}

