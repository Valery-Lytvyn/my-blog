export interface PostType {
  title: string;
  summary: string;
  content: string;
  file: File | null | string;
}

export interface ResponsePostType extends PostType {
  _id: string;
  updatedAt: string;
  author: { _id: string; username: string };
  cover: string;
}
