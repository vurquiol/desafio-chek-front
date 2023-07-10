import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {SnackBarAnnotatedComponent} from '../snack-bar-annotated/snack-bar-annotated.component';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [UserService, AccountService]
})

export class AccountComponent implements OnInit {

  @Output() logOut = new EventEmitter<boolean>();
  
  public spinner: any = false;

  constructor(private _userService: UserService, private _accountService: AccountService,public snackbar: SnackBarAnnotatedComponent) {    
  }

  account: any;
  accountId: any;
  balance: any;
  user: any;
  valorEntrada: string = '';
  valorFormateado: string = '';
  valorFormateadoSaldo: string = '';

  ngOnInit(): void {    
    this.user = this._userService.getIdentity();
    this.spinner = true;
    this._accountService.accountBalance(this.user,false).subscribe(
      response => {
       
        this.concatIdAccount(response.account.idAccount);
        this.concatcAmountBalance(response.account.accountBalance);
        
        this.balance = this.valorFormateadoSaldo;
        this.accountId = this.valorFormateado;

        this.account = response.account;
        console.log(this.account);
    
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

//concatena y separa los valores del id account
 concatIdAccount(idAccount :number) {
    // Elimina los espacios existentes antes de contar los caracteres
    const valorSinEspacios = idAccount.toString().replace(/\s/g, '');

    // Divide el valor en grupos de cuatro caracteres
    const grupos = valorSinEspacios.match(/.{1,4}/g);

    // Une los grupos con espacios y actualiza el valor formateado
    this.valorFormateado = grupos ? grupos.join(' ') : '';
  }

  concatcAmountBalance(balance :number) {
    // Elimina los espacios existentes antes de contar los caracteres 
    const numeroDividido = balance.toLocaleString('es-ES');

    // Une los grupos con espacios y actualiza el valor formateado
    this.valorFormateadoSaldo = numeroDividido ;
  }

  logout(){
    this.logOut.emit(true);
  }

  sessionExp(){
    localStorage.setItem('SessionExpired','true');    
  }
}
