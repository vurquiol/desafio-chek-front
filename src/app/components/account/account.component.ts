import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarAnnotatedComponent} from '../snack-bar-annotated/snack-bar-annotated.component';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [UserService, AccountService]
})

export class AccountComponent implements OnInit {

  tarjetaCredito = {
    numero: '**** **** **** 1234',
    titular: 'John Doe',
    fechaExpiracion: '12/24',
    cvv: '123',
    saldo: '500000'
  };

  @Output() logOut = new EventEmitter<boolean>();
  
  public spinner: any = false;

  constructor(private _userService: UserService, private _accountService: AccountService,public snackbar: SnackBarAnnotatedComponent) {    
  }

  account: any;
  user: any;

  ngOnInit(): void {    
    this.user = this._userService.getIdentity();
    this.spinner = true;
    this._accountService.accountBalance(this.user,false).subscribe(
      response => {
        this.account = response.account;
        console.log(this.account);
      /*   if (response.historico.length >= 1) {
           
        } else {
          this.snackbar.openSnackBar("NO", 'Close');
        } */
        this.spinner = false;
      },
      error => {
        if (error.status = 401) {
          this.snackbar.openSnackBar("EXPIRED", 'Close');
          
        } else {
          this.snackbar.openSnackBar(error.error.message, 'Close');
        }
        this.spinner = false;
      }
    );
  } 

  logout(){
    this.logOut.emit(true);
  }

  sessionExp(){
    localStorage.setItem('SessionExpired','true');    
  }
}
