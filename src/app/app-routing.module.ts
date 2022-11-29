import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'add-book', pathMatch: 'full'},
  {path: 'add-book', component: AddBookComponent},
  {path: 'books-list', component: BookListComponent},
  {path: 'edit-book/:id', component: BookDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
