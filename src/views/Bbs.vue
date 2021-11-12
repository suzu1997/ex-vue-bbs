<template>
  <div class="container">
    <div>
      <label for="articleName">投稿者名：</label>
      <input type="text" id="articleName" v-model="articleName" /><br />
      <label for="articleContent">投稿内容：</label>
      <textarea id="articleContent" v-model="articleContent" />
      <button v-on:click="addArticle">記事投稿</button>
    </div>
    <div v-for="article of currentArticleList" :key="article.id">
      <hr />
      <div>投稿者名：{{ article.name }}</div>
      <div>投稿内容：</div>
      <pre>{{ article.content }}</pre>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

/**
 * 掲示板画面の表示機能を表すクラスコンポーネント.
 */
@Component
export default class Bbs extends Vue {
  // 現在の記事一覧
  private currentArticleList = [];
  // 投稿者名
  private articleName = "";
  // 投稿内容
  private articleContent = "";

  /**
   * 記事一覧を表示する.
   *
   * @remarks Vuexストア内の記事一覧(articles)をcurrentArticleListに格納する
   */
  created(): void {
    this.currentArticleList = this.$store.getters.getArticles;
    console.log(this.currentArticleList);
  }
  /**
   * 記事を追加する.
   */
  addArticle(): void {
    this.$store.commit("addArticle", {
      id: this.$store.getters.getArticles[0].id + 1,
      name: this.articleName,
      content: this.articleContent,
      comments: [],
    });
    this.articleName = "";
    this.articleContent = "";
  }
}
</script>
<style scoped>
.container {
  margin: 0 auto;
  width: 300px;
  border: 1px solid black;
  padding: 5px;
}
</style>
