import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse, HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    constructor(private http: HttpClient){}

    addUser(name: string, profileImage: File): Observable<any> {
        const formData: any = new FormData();
        formData.append('name', name);
        formData.append('avatar', profileImage);

        return this.http.post('https://localhost:44370/api/books', formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(catchError(this.errorMgmt));
    }
    errorMgmt(error: HttpErrorResponse){
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
