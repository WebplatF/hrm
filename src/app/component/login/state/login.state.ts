
import { Injectable,signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginState {

loading=signal(false);

    setLoading(status:boolean){
        console.log(this.loading.set(status))
        return this.loading.set(status);
    }
}