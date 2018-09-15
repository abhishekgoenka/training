import { Injectable } from '@angular/core';
import { EpToastService } from '@epicor/kinetic';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  constructor(public epToast: EpToastService) {}

  success(msg: string) {
    this.toastr(msg, 'success');
  }

  error(msg: string) {
    this.toastr(msg, 'error');
  }

  private toastr(msg: string, toastType: string) {
    const tstConfig = {
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 3000,
      extendedTimeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true,
      enableHtml: true
    };
    const toastOpt = {
      message: `<p><a href="#"><b><u> Click here </u></b></a>${msg}</p>`,
      title: toastType,
      toastConfig: tstConfig,
      toastType: toastType
    };
    this.epToast.show(toastOpt);
  }
}
