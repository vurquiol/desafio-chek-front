import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Account } from "../models/account";
import { Parser } from "@angular/compiler";

@Injectable()
export class AccountService {
    public url: string;    
    token: any;

    constructor(private _http: HttpClient) {
        this.url = "https://chek-back-vurquiol.rj.r.appspot.com/api/"
        //this.url = "localhost:3000/api/"
    }

    accountBalance(user_login: any,gethash:boolean){
        if (gethash) {
            user_login.gethash = gethash;
        }
        
        let json = JSON.stringify(user_login);
        let params = json;

        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':this.getToken()});

        return this._http.post<any>(this.url +'balance',params,{headers: headers});
    }

    historical(user_login: any,gethash:boolean){
        if (gethash) {
            user_login.gethash = gethash;
        }
        
        let json = JSON.stringify(user_login);
        let params = json;

        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':this.getToken()});

        return this._http.post<any>(this.url +'historical',params,{headers: headers});
    }

    loginRegister(user_login: any, gethash: boolean) {
        if (gethash) {
          user_login.gethash = gethash;
        }

      let headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':this.getToken()});
        console.log(this.getToken())
      
        return this._http.post<any>(this.url + 'loginRegister', user_login, {headers: headers});
      }
   

      getToken() {
        let token = localStorage.getItem('token');
      
        if (token !== undefined && token !== null) {
          this.token = token;
        } else {
          this.token = null;
        }
      
        return this.token;
      }
  

}