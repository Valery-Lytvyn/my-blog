export const ROUTES = {
  index: "/",
  login: "/login",
  register: "/register",
  create: "/create-new-post",
  edit: (id: string | null) => (id ? `/edit-post/${id}` : "edit-post/:id"),
  post: (id: string | null) => (id ? `/post/${id}` : "post/:id"),
};
