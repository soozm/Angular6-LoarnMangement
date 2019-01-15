import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { faSearch, faBars, faInfoCircle, faCalendarAlt,
  faLandmark, faPaperclip, faArchive, faTrash, faStream } from '@fortawesome/free-solid-svg-icons';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { APIUtilService } from '../services/apiUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
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
  faSlidersH = faStream
  loanEntries = []
  loan:any = {}
  calendarModel: any

  public loading: boolean
  public loadingPrices: boolean
  closeResult: string;

  constructor(
    private http: HttpClient,
    private apiService: APIUtilService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getLoanEntries()
  }

  // Modal code
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'create-loan-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getLoanEntries(): void {
    this.loading = true
    this.apiService.getLoanEntries()
      .subscribe(data => {
        this.loanEntries = data.loans
        this.loading = false
      })
  }

  createLoanEntry(loan: any):void {
    this.apiService.createLoan(loan)
    .subscribe(data => {
      window.location.reload();
    })
  }
}
