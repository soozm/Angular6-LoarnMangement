import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class APIUtilService {

  private baseUrl = 'http://localhost:5000';  // API url

  constructor(
    private http: HttpClient
  ) { }

  //  Get loans
  getLoanEntries(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/loans`)
      .pipe(
        tap(loans => console.log(loans, `fetched loans`)),
        catchError(this.handleError('getLoanEntries', []))
      );
  }

  getLoan(loanId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/loan/${loanId}`)
      .pipe(
        tap(loan => console.log(loan, `fetched loan`)),
        catchError(this.handleError('getLoan', []))
      );
  }

  addLoanNote(data): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/loan/${data.loanId}/note`, data.note)
    .pipe(
      tap(data => console.log(data, `Loan note added`)),
      catchError(this.handleError('addLoanNote', []))
    )
  }

  createLoan(loanData): Observable<any> {
    let balance = loanData.amount - loanData.partialPayments
    loanData.balance = balance
    return this.http.post<any>(`${this.baseUrl}/loan`, loanData)
    .pipe(
      tap(loan => console.log(loan, `Loan created`)),
      catchError(this.handleError('getLoanEntries', []))
    )
  }

  editLoan(loan): Observable<any> {
    let balance = loan.amount - loan.partialPayments
    loan.balance = balance
    return this.http.put<any>(`${this.baseUrl}/loan/${loan.id}`, loan)
    .pipe(
      tap(loan => console.log(loan, `Loan edited`)),
      catchError(this.handleError('editLoan', []))
    )
  }

  deleteLoan(loanId: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/loan/${loanId}`)
      .pipe(
        tap(response => console.log(response, `deleted loan`)),
        catchError(this.handleError('deleteLoan', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}