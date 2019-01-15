import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoansComponent } from './loans/loans.component';

// Route
const routes: Routes = [
  { path: '', redirectTo: '/loans', pathMatch: 'full' },
  { path: 'loans', component: LoansComponent },
  { path: 'loan/:id', component: LoanDetailComponent },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
