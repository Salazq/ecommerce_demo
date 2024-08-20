import { Component, EventEmitter, Output } from '@angular/core';
import { IconSettings } from '../icons/settings';

@Component({
  selector: 'app-menu',
  template: `
    <button class="relative" type="button" (click)="openMenu()">
      <app-icon-settings />

      @if (isOpen) {

        <div
          class="absolute right-0 top-7 border border-gray-500/50"
        >
          <ul
            class="text-sm text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li class="mb-1">
              <button
                class="w-full p-1 hover:bg-zinc-900"
                (click)="onEditBook.emit()">
                 Edit
              </button>
            </li>
            <li>
              <button
                (click)="onDeleteBook.emit()"
                class="w-full p-1 hover:bg-zinc-900"
              >
                 Delete
              </button>
            </li>
          </ul>
        </div>
      }
    </button>
  `,
  standalone: true,
  imports: [IconSettings],
})
export class MenuComponent {
  @Output() onEditBook = new EventEmitter<void>();

  @Output() onDeleteBook = new EventEmitter<void>();

  isOpen = false;

  openMenu() {
    this.isOpen = !this.isOpen;
  }
}
