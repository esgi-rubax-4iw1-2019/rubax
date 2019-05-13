import Vue from "vue";
import Vuex from "vuex";
import Vapi from "vuex-rest-api";
import repository from "@/repository";

Vue.use(Vuex);

const posts = new Vapi({
  axios: repository,
  state: {
    posts: [],
    post: {}
  }
})
  .get({
    action: "loadPosts",
    property: "posts",
    path: "/posts",
    queryParams: true,
    onSuccess(state, payload) {
      state.posts = [...state.posts, ...payload.data];
    }
  })
  .get({
    action: "getPost",
    property: "post",
    path: ({id}) => `/posts/${id}`
  })
  .post({
    action: "createPost",
    path: "/posts",
    onSuccess: (state, payload) => {
      state.posts.push(payload.data);
    }
  })
  .post({
    action: "upvotePost",
    path: ({post_id}) => `/posts/${post_id}/upvotes`,
    onSuccess(state) {
      state.post.upvotes++;
    }
  })
  .post({
    action: "login",
    property: "token",
    path: "/auth/login",
    onSuccess(state, payload) {
      localStorage.setItem('token', payload.data.jwt);
    }
  })
  .getStore();

const store = new Vuex.Store(posts);

export default store;