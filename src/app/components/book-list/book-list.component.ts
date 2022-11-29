import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  Books: any = [];

  constructor(private service: CrudService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.service.getData().subscribe({
      next: (res: any) => {
        this.Books = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  deleteBook(id: any, data: any) {
    if (window.confirm('Do you want to delete?')) {
      this.service.deleteData(id).subscribe({
        next: (res: any) => {
          this.Books.slice(data, 1);
          this.getAllBooks();
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

}
