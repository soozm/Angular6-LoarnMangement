import { Component, OnInit } from '@angular/core';
import { faSearch, faBars, faInfoCircle, faCalendarAlt,
  faLandmark, faPaperclip, faArchive, faTrash, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
// Services
import { APIUtilService } from '../../services/apiUtils';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  currencySymbol = '₡'
  faSearch = faSearch
  faBars = faBars
  username = "Alonso"
  faInfoCircle = faInfoCircle
  faCalendar = faCalendarAlt
  faLandmark = faLandmark
  faPaperclip = faPaperclip
  faArchive = faArchive
  faTrash = faTrash
  faEllipsisV = faEllipsisV
  loanEntries = []
  loan:any = {}

  public loading: boolean
  public loadingPrices: boolean
  closeResult: string;

  constructor(
    private router: Router,
    private apiService: APIUtilService
  ) { }

  ngOnInit() {
    this.getLoanEntries()
  }

  getLoanEntries(): void {
    this.loading = true
    this.apiService.getLoanEntries()
      .subscribe(data => {
        this.loanEntries = data.loans
        this.loading = false
      })
  }

  gotoLoanDetail(loan): void {
    this.router.navigate(['/loan', loan.id]);
  }

}
