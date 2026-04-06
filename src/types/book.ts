export type BookStatus = "wishlist" | "reading" | "completed";

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: string;
  status: BookStatus;
  rating?: number | null;
  summary: string;
  takeaways: string[];
  recommend: boolean;
  noteUrl: string | null;
}
