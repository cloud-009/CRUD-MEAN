import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm!: FormGroup;

  constructor(private router: Router, private zone: NgZone, private fb: FormBuilder, private service: CrudService) { }

  ngOnInit(): void {
    this.formControls();
  }

  formControls() {
    this.bookForm = this.fb.group({
      name: [''],
      price: [''],
      description: [''],
    })
  }

  submitHandler() {
    this.service.addData(this.bookForm.value).subscribe({
      next: (res) => {
        console.log('data added');
        this.zone.run(() => this.router.navigateByUrl('/books-list'));
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
