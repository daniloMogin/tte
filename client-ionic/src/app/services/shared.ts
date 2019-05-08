import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export const API_ROOT = 'http://localhost:3000/API/';

export function handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

        console.log('Error while executing operation: ' + operation);
        console.error(error);

        // check connectivity

        let errorMessage: string = error.status + ' ' + error.statusText;

        console.log(errorMessage);
        console.log(error);
        console.log(error.error);
        console.log(error.error.msg);

        if (error.error && error.error.msg) {
            console.log(error.error.msg);

            errorMessage = errorMessage + ' - ' + error.error.msg;
            console.log(errorMessage);

        }

        console.log('Show toast');

        this.notificationService.showToast({message: errorMessage});

        console.log('Error handling done');

        return of(result as T);
    };
}

export function getHeaders(): any {
    if (localStorage.getItem('token')) {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
    } else {
        return {};
    }
}
