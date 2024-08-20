import { Injectable, inject } from '@angular/core';
import {Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Book, BookForm } from '../interfaces/books.interface';


@Injectable({
  providedIn: 'root',
})
export class BooksService {

  private firestore = inject(Firestore);
  private collection = collection(this.firestore, 'books');


  getbooks() {
    return collectionData(this.collection, { idField: 'id' }) as Observable<Book[]>;
  }

  async getbook(id: string) {
      const snapshot = await getDoc(doc(this.firestore, `books/${id}`));
      return snapshot.data() as Book;
  }

  async searchbookByQuery(name: string) {

    const querySnapshot = await getDocs(query(
      this.collection,
      where('name', '>=', name),
      where('name', '<=', name + '\uf8ff'),
    ));

    let books: Book[];

    books = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));

    return books;
  }

  createbook(book: BookForm) {
    return addDoc(this.collection, book);
  }

  updatebook(id: string, book: BookForm) {
    return updateDoc(doc(this.firestore, `books/${id}`), { ...book });
  }

  deletebook(id: string) {
    return deleteDoc(doc(this.firestore, `books/${id}`));
  }

}
