import { action, makeObservable, observable } from 'mobx';
const { ACCESS_KEY_UNSPLASH } = process.env;
console.log(ACCESS_KEY_UNSPLASH);
class PostsStore {
  posts = [];
  page = 1;
  error = {};
  isLoading = false;

  constructor() {
    makeObservable(this, {
      posts: observable,
      fetchPosts: action,
    });
  }

  fetchPosts = async () => {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${this.page}&_limit=10`
      );
      const data = await response.json();

      this.posts = [...this.posts, ...data];
      this.page = this.page + 1;
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  };
}

export const postsStore = new PostsStore();
