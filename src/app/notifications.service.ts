import {MatSnackBar} from '@angular/material/snack-bar';
import {Injectable, OnDestroy} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService implements OnDestroy {
  private defaultDuration = 3000;
  private snackBarRef = null;
  private snackBarSub = null;

  constructor(private snackBar: MatSnackBar) {
  }


  ngOnDestroy() {
    this.snackBarSub && this.snackBarSub.unsubscribe();
  }

  showNotification(text: string) {
    this.snackBarRef = this.snackBar.open(text, 'close', {
      duration: this.defaultDuration,
      verticalPosition: 'top'
    });

    this.snackBarSub = this.snackBarRef.onAction().subscribe(() => {
      this.snackBarRef.dismiss();
    });
  }
}
