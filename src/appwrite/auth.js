import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account= new Account(this.client);
    }
    async createAccount({email,password,name}){
        try {
          const userAccount =await this.account.create(ID.unique(),email,password,name);
          if(userAccount){
              //If account is exist then direct go to the login area
              return this.login({email,password});
          }else{
              return userAccount;
          }
        }catch (error) {
            console.log(error)
        }
    }

    async login({email,password}){
        try{
          return await this.account.createEmailSession(email,password)
        }catch (error) {
            // throw error;
            console.log('error',error)

        }
    }

    async getCurrentAccount(){
        try {
            return await this.account.get();
        }catch (error){
            console.log('Appwrite service error ::',error);
        }
        return null;
    }

    async logout(){
        try {
            return this.account.deleteSessions();
        }catch (e) {
            console.log(e)
        }
    }
}

const authService = new AuthService();

export default authService;

//Very optimized and production level code