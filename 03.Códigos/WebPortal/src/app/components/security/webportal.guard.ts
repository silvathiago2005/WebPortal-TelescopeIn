import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class webPortalGuard implements Resolve<boolean>{
    
    constructor(private authService: AuthService, private router: Router){}

    resolve(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let user = this.authService.getUser();
        if(user) return true;
        this.router.navigate(['/Login']);
        return false;
    }
}
