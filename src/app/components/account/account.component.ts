import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {SnackBarAnnotatedComponent} from '../snack-bar-annotated/snack-bar-annotated.component';
import { AccountService } from 'src/app/services/account.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [UserService, AccountService]
})

export class AccountComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'surname', 'usuario', 'exitoso', 'fecha'];

  @ViewChild(MatDatepicker) datepicker!: MatDatepicker<Date>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() logOut = new EventEmitter<boolean>();
  
  historico: any=false;
  header:boolean=true;  
  bmoduleaccount: boolean=false;
  public spinner: any = false;
  public token: any;

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
   
  this.token= this._userService.getToken();
    this.user = this._userService.getIdentity();
     this.spinner = true;
  
     this.accountBalance();
     this.loginRegister();
    
     
  } 
  historical(){
    this._accountService.historical(this.user,true).subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource(response.historical);
        this.dataSource.paginator = this.paginator;
        this.spinner = false;
      },
      (error: any)  => {
        if (error.status = 401) {
          this.snackbar.openSnackBar("historical", 'Close');
          
        } else {
          this.snackbar.openSnackBar(error.error.message, 'Close');
        }
        this.spinner = false;
      }
    );
  }

  loginRegister(){
    this._accountService.loginRegister(this.user,true).subscribe(
      (response: any) => {
        this.spinner=false
      },
      (error: any) => {       
        this.spinner = false;
      }
    );     
  }

  aplicarFiltro(fecha: Date): void {
    this.dataSource.filterPredicate = (data: any) => {
      const selectedDate = new Date(fecha);
      const dataDate = new Date(data.fecha);
      return (
        selectedDate.getDate() === dataDate.getDate() &&
        selectedDate.getMonth() === dataDate.getMonth() &&
        selectedDate.getFullYear() === dataDate.getFullYear()
      );
    };
    this.dataSource.filter = fecha.toString();
    if (fecha) {
      this.datepicker.close();
    }
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

  accountBalance(){
    this._accountService.accountBalance(this.user,true).subscribe(
      (response: any) => {
      
        this.concatIdAccount(response.account.idAccount);
        this.concatcAmountBalance(response.account.accountBalance);
        
        this.balance = this.valorFormateadoSaldo;
        this.accountId = this.valorFormateado;

        this.account = response.account;   
    
        this.spinner = false;
      },
      (error: any)  => {
        if (error.status = 401) {
          this.snackbar.openSnackBar("accountBalance", 'Close');
          
        } else {
          this.snackbar.openSnackBar(error.error.message, 'Close');
        }
        this.spinner = false;
      }
    );
  }

  moduleLoginAttempt(){
    this.header=false;
    this.historico=true;
    this.historical();
  }


  moduleBalance(){
    this.accountBalance();
    this.header=true;
    this.bmoduleaccount=true;
  }
}
