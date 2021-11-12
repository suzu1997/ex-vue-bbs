<template>
  <div id="app">掲示板画面</div>
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

  /**
   * 記事一覧を表示する.
   *
   * @remarks Vuexストア内の記事一覧(articles)をcurrentArticleListに格納する
   */
  created(): void {
    this.currentArticleList = this.$store.getters.getArticles;
  }
}
</script>
<style scoped></style>
