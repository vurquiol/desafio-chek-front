import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
public register=false;
public user: User;
public identity: any;
public token: any;
public errorMessage: any;
global:any
public spinner:any=false;

color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';

constructor(private _userService: UserService) {
  this.user = new User('', '', '', 0, '', '', 0);
  
}
ngOnInit(): void {
  this.identity = this._userService.getIdentity()
  this.token= this._userService.getToken();
}

public crearCuenta(){
 
  this.register=true;
}

public onSubmit() {
 this.logIn();
}

logIn(){
  this.spinner=true
  this._userService.signUp(this.user,false).subscribe(
    response => {
      let identity = response.user;
      this.identity = identity;

     if (!this.identity._id) {
          
      } else {       
        localStorage.setItem('identity',JSON.stringify(identity));
        this._userService.signUp(this.user,true).subscribe(
          response => {
            let token = response.token;
            this.token = token;

            if (this.token.length <= 0) {          
            } else {             
              localStorage.setItem('token',token);            
            }
            this.spinner=false
          },
          error => {
            var errorMessage = <any>error.error.message;
            if (errorMessage != null) {
              this.errorMessage = error.error.message   
              this.spinner=false                        
            }
          }
        );       
      }
    },
    error => {
      var errorMessage = <any>error.error.message;
      if (errorMessage != null) {
        this.errorMessage = error.error.message
        if (error.status = 404) {
               
        } else {    
        }
        this.spinner=false
              
      }
    }
  );
}

logout(){
  localStorage.removeItem('identity');
  localStorage.removeItem('token');
  localStorage.clear();
  this.identity=null;
  this.token=null;
  this.user=new User();

}

}