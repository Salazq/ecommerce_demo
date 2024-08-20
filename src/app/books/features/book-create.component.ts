import { Component, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { BooksService } from '../data-access/books.service';
import { BookForm } from '../interfaces/books.interface';

export interface CreateForm {
  name: FormControl<string>;
  description: FormControl<string>;
  value: FormControl<number>;
}

@Component({
  selector: 'app-book-create',
  template: `
    <div class="px-4 xl:px-0 w-full max-w-[600px] m-auto">
      <form [formGroup]="form" (ngSubmit)="createbook()">
        <div class="mb-8">
          <label for="name" class="block mb-2 text-sm font-medium"
            >Name</label
          >
          <input
            type="text"
            id="name"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="El principe"
            formControlName="name"
          />
        </div>
        <div class="mb-8">
          <label for="description" class="block mb-2 text-sm font-medium"
            >Description</label
          >
          <input
            type="text"
            id="description"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Una obra maestra"
            formControlName="description"
          />
        </div>
        <div class="mb-8">
          <label for="value" class="block mb-2 text-sm font-medium"
            >Value</label
          >
          <input
            type="number"
            id="value"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="5"
            formControlName="value"
          />
        </div>

        <div class="flex justify-between items-center">
          <a
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-gray-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            routerLink="/dashboard"
          >
            Back to dashboard
          </a>

          <button
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-gray-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            type="submit"
          >
            @if (bookId) {
              Edit your book
            } @else {
              Create your book
            }
          </button>
        </div>
      </form>
    </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
})
export default class BookCreateComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;

  private _router = inject(Router);

  private _booksService = inject(BooksService);

  private _bookId = '';

  get bookId(): string {
    return this._bookId;
  }

  @Input() set bookId(value: string) {
    this._bookId = value;
    this.setFormValues(this._bookId);
  }

  form = this._formBuilder.group<CreateForm>({
    name: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control(''),
    value: this._formBuilder.control(0, Validators.required)
  });

  async createbook() {
    if (this.form.invalid) return;

    try {
      const book = this.form.value as BookForm;
      !this.bookId
        ? await this._booksService.createbook(book)
        : await this._booksService.updatebook(this.bookId, book);
      this._router.navigate(['/dashboard']);
    } catch (error) {
      // call some toast service to handle the error
    }
  }

  async setFormValues(id: string) {
    try {
      const book = await this._booksService.getbook(id);
      if (!book) return;
      this.form.setValue({
        name: book.name,
        description: book.description,
        value: book.value,
      });

      console.log(book)
    } catch (error) {}
  }
}
