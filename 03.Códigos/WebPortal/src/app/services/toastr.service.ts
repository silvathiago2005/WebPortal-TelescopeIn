import { Injectable } from "@angular/core";
import { ToastrManager } from "ng6-toastr-notifications";

declare const toastr: any;

@Injectable({
    providedIn: 'root'
})

export class ToastrNotification{

    constructor(private toastr: ToastrManager){}

    showSuccess(message: string, title?: string) {
        title = title || 'Atenção'
        this.toastr.successToastr(message, title)
      }
    
      showError(message: string, title?: string) {
        title = title || 'Atenção'
        this.toastr.errorToastr(message, title);
      }
    
      showWarning(message: string, title?: string) {
        title = title || 'Atenção'
        this.toastr.warningToastr(message, title);
      }
    
      showInfo(message: string, title?: string) {
        title = title || 'Atenção'
        this.toastr.infoToastr(message, title);
      }
}

class ToastrService {

    success(message: string, title?: string) {
        title = title || 'Atenção';
        toastr.success(message, title);
    }

    warning(message: string, title?: string) {
        title = title || 'Atenção';
        toastr.warning(message, title);
    }

    info(message: string, title?: string) {
        title = title || 'Atenção';
        toastr.info(message, title);
    }

    error(message: string, title?: string) {
        title = title || 'Atenção';
        toastr.error(message, title);
    }
}