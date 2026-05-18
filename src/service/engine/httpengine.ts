import { HttpBackend, HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../app/environment/environment';



@Injectable({ providedIn: 'root' })
export class HttpEngine {
    private baseurl = environment.apiBaseUrl;
    private rawHttp: HttpClient;
    constructor(private http: HttpClient, private handler: HttpBackend) {
        this.rawHttp = new HttpClient(handler);
    }

    /**
     * @returns string ip
     */
    getIp(): Observable<string> {
        return this.rawHttp.get<{ ip: string }>('https://api.ipify.org?format=json').pipe(
            map(res => res.ip)
        );
    }
    /**
     * 
     * @param url 
     * @param isProtected 
     * @returns 
     */
    get<T>(url: string, isProtected: boolean = true): Observable<T> {
        return this.http.get<T>(
            `${this.baseurl}${url}`,
            {
                headers: {
                    'x-protected': String(isProtected)
                },
                withCredentials: true
            }
        );
    }
    /**
     * 
     * @param url 
     * @param body 
     * @param isProtected 
     * @returns 
     */
    post<T>(url: string, body: any, isProtected: boolean = true): Observable<T> {
        const isFormData = body instanceof FormData;

        return this.http.post<T>(
            `${this.baseurl}${url}`,
            body,
            {
                headers: { 'x-protected': String(isProtected) },
                withCredentials: true
            }
        );
    }
    /**
     * 
     * @param url 
     * @param body 
     * @param isProtected 
     * @returns 
     */
    put<T>(url: string, body: any, isProtected: boolean = true): Observable<T> {
        return this.http.put<T>(
            `${this.baseurl}${url}`,
            body,
            {
                headers: {
                    'x-protected': String(isProtected)
                },
                withCredentials: true
            }
        );
    }
    /**
     * 
     * @param url 
     * @param isProtected 
     * @returns 
     */
    delete<T>(url: string, isProtected: boolean = true): Observable<T> {
        return this.http.delete<T>(
            `${this.baseurl}${url}`,
            {
                headers: {
                    'x-protected': String(isProtected)
                },
                withCredentials: true
            }
        );
    }

    patch<T>(url: string, body: any, isProtected: boolean = true): Observable<T> {
  return this.http.patch<T>(
    `${this.baseurl}${url}`,
    body,
    {
      headers: {
        'x-protected': String(isProtected)
      },
      withCredentials: true
    }
  );
}

}
