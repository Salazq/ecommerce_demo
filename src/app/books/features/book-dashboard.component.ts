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
    <div class="max-w-[1200px] m-auto">

      <app-search-bar (changeQuery)="changeQuery($event)" />

      <section class="grid grid-cols-3 gap-8 mt-8">
        @for (book of books | async; track book.id) {
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

  private booksService = inject(BooksService);
  private router = inject(Router);

  books = this.booksService.getbooks();

  async deleteBook(id: string) {
      await this.booksService.deletebook(id);
  }

  editBook(book: Book) {
    this.router.navigate(['/dashboard/edit', book.id]);
  }

  async changeQuery(query: string) {
      const books = await this.booksService.searchbookByQuery(query);
      this.books = of(books);
  }
}
