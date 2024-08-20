export interface Book extends BookForm {
  id: string;
}

export interface BookForm {
  name: string;
  description: string;
  value: number;

}
