//Major configuration for appWrite
import conf from "../conf/conf.js";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
     client = new Client();
     databases;
     bucket; //Storage


     constructor() {
         this.client.setEndpoint(conf.appwriteUrl)
             .setProject(conf.appwriteProjectId);

         this.databases = new Databases(this.client);
         this.bucket = new Storage(this.client)
     }

     async createPost({title,slug,content,featureImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, //id
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId,
                }
            )
        }catch (error){
            console.log('Appwrite error :: createPost ::',error);
        }
     }

     async updatePost(slug,{title,content,featureImage,status}){
         try {
             return await this.databases.updateDocument(
               conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                 slug,
                 {
                     title,
                     content,
                     featureImage,
                     status
                 }
             )
         }catch (error){
             console.log('Appwrite error :: createPost ::',error);
         }
     }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        }catch (error){
            console.log('Appwrite error :: createPost ::',error);
            return false;
        }
    }

    async getPost(slug){
         try {
             return await this.databases.getDocument(
                 conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                 slug
             )
         }catch (error){
             console.log('Appwrite error :: createPost ::',error);
             return true;
         }
    }

    async getAllPost(queryes=[Query.equal('status','active')]){
         try {
             return await this.databases.listDocuments(
                 conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                 queryes,

             )
         }catch (error){
             console.log('Appwrite error :: createPost ::',error);
             return false;
         }
    }

    async uploadFile(file){
         try {
             return await this.bucket.createFile(
                 conf.appwriteBucketId,
                 ID.unique(),
                 file
             )
         }catch (error){
             console.log('AppWrite error :: uploadFile',error);
             return false;
         }
    }

    async deleteFile(fileId){
         try {
              await this.bucket.deleteFile(
                 conf.appwriteBucketId,
                 fileId
             )
             return true
         }catch (error) {
             console.log('AppWrite error :: deleteFile',error);
             return false;
         }
    }

    //Why this method is not async?
    //Cause this file doesn't return any promise.
    getFilePreview(fileId){
         return this.bucket.getFilePreview(
             conf.appwriteBucketId,
             fileId
         )
    }
}

const service = new Service();

export default service;
//Instate of exporting the class , just export the object of that class.