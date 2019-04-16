import { Observable, of } from 'rxjs';

export const API_ROOT = 'localhost:3000/API/';

export function handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(error);
        return of(result as T);
    };
}
