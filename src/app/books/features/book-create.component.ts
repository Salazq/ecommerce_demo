import { Component, Input, inject } from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators,} from '@angular/forms';
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
    <div class=" max-w-[600px] m-auto">
      <form [formGroup]="form" (ngSubmit)="createbook()">
        <div class="mb-8">
          <label for="name">Name</label>
          <input
            type="text"
            class="w-full p-3 border-gray-500 border"
            placeholder="El principe"
            formControlName="name"
          />
        </div>
        <div class="mb-8">
          <label for="description"
            >Description</label>
          <input
            type="text"
            class="w-full p-3 border-gray-500 border"
            placeholder="Una obra maestra"
            formControlName="description"
          />
        </div>
        <div class="mb-8">
          <label for="value">Value</label>
          <input
            type="number"
            class="w-full p-3 border-gray-500 border"
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
            @if (bookIdStr) {
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

  private formBuilder = inject(FormBuilder).nonNullable;
  private router = inject(Router);
  private booksService = inject(BooksService);
  protected bookIdStr = '';


  @Input() set bookId(value: string) {
    this.bookIdStr = value;
    this.setFormValues(this.bookIdStr);
  }

  form = this.formBuilder.group<CreateForm>({
    name: this.formBuilder.control('', Validators.required),
    description: this.formBuilder.control(''),
    value: this.formBuilder.control(0, Validators.required)
  });

  async createbook() {

    if (this.form.invalid) return;

    const book = this.form.value as BookForm;

    if (this.bookIdStr) {

      await this.booksService.updatebook(this.bookIdStr, book)
      this.router.navigate(['/dashboard']);

    } else {

      await this.booksService.createbook(book)
      this.router.navigate(['/dashboard']);

    }
  }

  async setFormValues(id: string) {
      const book = await this.booksService.getbook(id);

      this.form.setValue({
        name: book.name,
        description: book.description,
        value: book.value,
      });
  }
}
