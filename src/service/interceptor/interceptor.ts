import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError, finalize } from 'rxjs';
import { StorageEngine } from './storage';

let isRefreshing = false;

/**
 * 
 * @param req 
 * @param next 
 * @returns 
 */
// export const InterCeptorEngine: HttpInterceptorFn = (req, next) => {
//     const storage = inject(StorageEngine);
//     const http = inject(HttpClient);
//     const isProtected = req.headers.get('x-protected') === 'true';
//     let modifiedReq = req.clone({
//         headers: req.headers.delete('x-protected')
//     });

//     modifiedReq = modifiedReq.clone({
//         setHeaders: {
//             'Apikey': 'hGplWUq/RM347OO8hXiZ+6x74EjaoBr0EbedSZbLgUKSGxbamrBqfRcZOO9TQXL/66cbKZVtIKxWpyciD4u93A==%'
//         }
//     });
//     if (isProtected) {
//         const token = storage.getAccessToken();
//         if (token) {
//             modifiedReq = modifiedReq.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//         }
//     }
//     return next(modifiedReq).pipe(
//         catchError((error: HttpErrorResponse) => {
//             if (error.status === 401 && isProtected && !isRefreshing) {
//                 isRefreshing = true;
//                 const refreshToken = storage.getRefreshToken();

//                 return http.post<any>('/auth/refresh', { refresh_token: refreshToken }).pipe(
//                     switchMap(res => {
//                         isRefreshing = false;
//                         storage.setAccessToken(res.access_token);
//                         storage.setRefreshToken(res.refresh_token);

//                         const retryReq = modifiedReq.clone({
//                             setHeaders: {
//                                 Authorization: `Bearer ${res.access_token}`,
//                                 Apikey: 'hGplWUq/RM347OO8hXiZ+6x74EjaoBr0EbedSZbLgUKSGxbamrBqfRcZOO9TQXL/66cbKZVtIKxWpyciD4u93A==%'
//                             }
//                         });

//                         return next(retryReq);
//                     }),
//                     catchError(err => {
//                         isRefreshing = false;
//                         storage.clear();
//                         return throwError(() => err);
//                     })
//                 );
//             }
//             return throwError(() => error);
//         })
//     );
// };
export const InterCeptorEngine: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageEngine);
  const http = inject(HttpClient);

  const isProtected = req.headers.get('x-protected') === 'true';

  let modifiedReq = req.clone({
    headers: req.headers.delete('x-protected')
  });

  // ✅ FIXED ApiKey
  modifiedReq = modifiedReq.clone({
    setHeaders: {
      'ApiKey': 'hGplWUq/RM347OO8hXiZ+6x74EjaoBr0EbedSZbLgUKSGxbamrBqfRcZOO9TQXL/66cbKZVtIKxWpyciD4u93A==%'
    }
  });

  // ✅ Attach token if protected
  if (isProtected) {
    const token = storage.getAccessToken();

    if (token) {
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401 && isProtected && !isRefreshing) {
        isRefreshing = true;

        const refreshToken = storage.getRefreshToken();

        return http.post<any>('/auth/refresh', {
          refresh_token: refreshToken
        }).pipe(
          switchMap(res => {
            isRefreshing = false;

            storage.setAccessToken(res.access_token);
            storage.setRefreshToken(res.refresh_token);

            const retryReq = modifiedReq.clone({
              setHeaders: {
                Authorization: `Bearer ${res.access_token}`,
                ApiKey: 'hGplWUq/RM347OO8hXiZ+6x74EjaoBr0EbedSZbLgUKSGxbamrBqfRcZOO9TQXL/66cbKZVtIKxWpyciD4u93A==%'
              }
            });

            return next(retryReq);
          }),
          catchError(err => {
            isRefreshing = false;
            storage.clear();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};