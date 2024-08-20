import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { CardBookComponent } from '../ui/card-book.component';
import { BooksService } from '../data-access/books.service';
import { Book } from '../interfaces/books.interface';
import { SearchBarComponent } from '../ui/search-bar.component';
import { of } from 'rxjs';

@Component({
  template: `
    <div class="px-4 xl:px-0 w-full max-w-[1200px] m-auto">
      <app-search-bar (changeQuery)="changeQuery($event)" />
      <section class="grid grid-cols-3 gap-8 mt-8">
        @for (book of books$ | async; track book.id) {
          <app-card-book
            [book]="book"
            (deleteBook)="deleteBook($event)"
            (editBook)="editBook($event)"
          />
        }
      </section>
    </div>
  `,
  standalone: true,
  imports: [CardBookComponent, SearchBarComponent, AsyncPipe],
})

export default class BookDashboardComponent {

  private _booksService = inject(BooksService);
  private _router = inject(Router);

  books$ = this._booksService.getbooks();

  async deleteBook(id: string) {
    try {
      await this._booksService.deletebook(id);
    } catch (error) {}
  }

  editBook(book: Book) {
    this._router.navigate(['/dashboard/edit', book.id]);
  }

  async changeQuery(query: string) {
  try {
      const books = await this._booksService.searchbookByQuery(query);
      this.books$ = of(books);
    } catch (error) {}
  }
}
