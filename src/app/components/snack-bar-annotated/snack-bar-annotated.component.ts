import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-annotated',
  templateUrl: './snack-bar-annotated.component.html',
  styleUrls: ['./snack-bar-annotated.component.css']
})

export class SnackBarAnnotatedComponent implements OnInit {

  timeOut = 3000;

  constructor(
    public snackBar: MatSnackBar
  ) { }


  openSnackBar(message: string, action: string) {
    setTimeout(() => {

      this.snackBar.open(message, action, {
        duration: this.timeOut,
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'       
      });

    })
  }

  ngOnInit() {
  }

}
