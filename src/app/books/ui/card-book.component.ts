import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../interfaces/books.interface';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'app-card-book',
  template: `
    <div class="border border-gray-500/50 rounded-md p-4 flex flex-row gap-x-4">
      <div class="flex-1">
        <h4 class="text-white mb-2 font-bold">{{ book.name }}</h4>
        <small class="text-yellow-500 mb-2">{{ book.description }}</small>
        <p class="text-gray-300 mb-2">Value: {{ book.value }}</p>


      </div>
      <div>
        <app-menu
          (onEditBook)="onEditBook(book)"
          (onDeleteBook)="onDeleteBook(book)"
        />
      </div>
    </div>
  `,
  standalone: true,
  imports: [MenuComponent],
})
export class CardBookComponent {
  @Input({ required: true }) book!: Book;

  @Output() editBook = new EventEmitter<Book>();

  @Output() deleteBook = new EventEmitter<string>();

  onEditBook(book: Book) {
    this.editBook.emit(book);
  }

  onDeleteBook(book: Book) {
    this.deleteBook.emit(book.id);
  }
}
