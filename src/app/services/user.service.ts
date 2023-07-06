import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { Parser } from "@angular/compiler";

@Injectable()
export class UserService {
    public url: string;
    identity: any;
    token: any;

    constructor(private _http: HttpClient) {
        this.url = "http://localhost:3005/api/"
    }

    signUp(user_login: any,gethash:boolean){
        if (gethash) {
            user_login.gethash = gethash;
        }

        let json = JSON.stringify(user_login);
        let params = json;

        let headers = new HttpHeaders({'Content-Type':'application/json'});

        return this._http.post<any>(this.url +'login',params,{headers: headers});
    }

    getIdentity(){
        let identity = localStorage.getItem('identity');

        if (identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
            
        }
        return JSON.parse(this.identity);
    }

    getToken(){
        let token = localStorage.getItem('token');

        if (token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
            
        }
        return this.token;

    }    

}