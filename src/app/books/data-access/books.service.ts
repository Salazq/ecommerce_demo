import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Book, BookForm } from '../interfaces/books.interface';

const PATH = 'books';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  getbooks() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<
      Book[]
    >;
  }

  async getbook(id: string) {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as Book;
  }

  async searchbookByQuery(name: string) {
    const q = query(
      this._collection,
      where('name', '>=', name),
      where('name', '<=', name + '\uf8ff'),
    );
    const querySnapshot = await getDocs(q);
    let books: Book[] = [];
    querySnapshot.forEach((doc) => {
      books = [...books, { id: doc.id, ...doc.data() } as Book];
    });
    return books;
  }

  createbook(book: BookForm) {
    return addDoc(this._collection, book);
  }

  updatebook(id: string, book: BookForm) {
    return updateDoc(this.document(id), { ...book });
  }

  deletebook(id: string) {
    return deleteDoc(this.document(id));
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }
}
