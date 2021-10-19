export class Moderator {
    public id!:number;    
    public email!:string;
    public password!:string;
    public first_name!:string;
    public last_name!:string;
    public avatar!:string;
    constructor(
        id:number,        
        email:string, 
        password:string, 
        first_name:string, 
        last_name:string, 
        avatar:string ) {            
        this.id = id;        
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.avatar = avatar;        
    }
}

