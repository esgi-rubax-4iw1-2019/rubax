<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <Clap :post="post"></Clap>
    <hr>
    <div>
      <h3>Comments :</h3>
      <ListComment :comments="post.comments" :post_id="post.id"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ListComment from "@/components/comment/ListComment";
import Clap from "@/components/post/Clap";

export default {
  name: "show-post",
  components: {
    ListComment,
    Clap
  },
  beforeMount() {
    this.getPost({ params: this.$route.params });
  },
  computed: {
    ...mapState(["post"])
  },
  methods: {
    ...mapActions(["getPost"])
  }
};
</script>
