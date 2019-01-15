import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

// local iimports
import { APIUtilService } from '../../services/apiUtils';

const URL = 'http://localhost:5000/api/upload';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {
  faThList = faThList
  currencySymbol = '₡'
  loanEntries = []
  loan:any = {}
  notes: any = []
  note:any = {}

  public loading: boolean
  public loadingPrices: boolean
  closeResult: string;

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: APIUtilService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getLoan();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        //  console.log('ImageUpload:uploaded:', item, status, response);
        console.log("item = ",item);
        console.log("status = ",status);
        console.log("response = ",response);
        //  alert('File uploaded successfully');
    };
  }

  getLoan(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loading = true
    this.apiService.getLoan(id)
    .subscribe(data => {
      this.loan = data.loan
      this.notes = this.loan.notes
      this.notes.sort((a: any, b: any): any => b.id - a.id)
      this.loading = false
    })
  }

  deleteLoan(loan: any): void {
    const loanId = loan.id
    this.apiService.deleteLoan(loanId)
    .subscribe(() => {
      this.router.navigate(['']);
    })
  }

  // Modal code
  openEditModal(Editcontent) {
    this.modalService.open(Editcontent, {ariaLabelledBy: 'edit-loan-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'create-note-modal'}).result.then((result) => {
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

  addLoanNote(loanId: any, note: any): void {
    const loanData = {loanId, note}
    this.apiService.addLoanNote(loanData)
    .subscribe(() => {
      window.location.reload();
    })
  }

  editLoan(loan: any) : void {
    this.apiService.editLoan(loan)
    .subscribe(data => {
      window.location.reload();
    })
  }

  afuConfig = {
    uploadAPI:  {
      url:"http://localhost:5000/upload"
    },
  };

}
