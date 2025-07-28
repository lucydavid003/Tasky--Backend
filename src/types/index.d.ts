 export interface Userpayload {
    id:string;
    firstName:string;
    lastName:string;
    userName:string;
    emailAddress:string;
    isDeleted:boolean
    
}

declare global{
    namespace Express{
        interface Request {
            user: Userpayload
        }
    }
}