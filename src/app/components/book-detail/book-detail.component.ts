import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  getId: any;
  updateForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private activatedRoute: ActivatedRoute,
    private crudService: CrudService) {

    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.getDataById(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description']
      });
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.crudService.updateData(this.getId, this.updateForm.value).subscribe({
      next: (res: any) => {
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
