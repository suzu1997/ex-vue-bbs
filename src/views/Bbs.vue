<template>
  <div class="container">
    <div>
      <div class="error" v-if="articleNameError">※名前を入力してください</div>
      <div class="error" v-if="articleNameLengthError">
        ※名前は50文字以内で入力してください
      </div>
      <label for="articleName">投稿者名：</label>
      <input type="text" id="articleName" v-model="articleName" /><br />
      <div class="error" v-if="articleContentError">
        ※投稿内容を入力してください
      </div>
      <label for="articleContent">投稿内容：</label>
      <textarea id="articleContent" v-model="articleContent" />
      <button v-on:click="addArticle">記事投稿</button>
    </div>
    <div v-for="(article, index) of currentArticleList" :key="article.id">
      <hr />
      <div>投稿者名：{{ article.name }}</div>
      <div>投稿内容：</div>
      <pre class="content">{{ article.content }}</pre>
      <button class="deleteBtn" v-on:click="deleteArticle(index)">
        記事削除
      </button>

      <div v-for="comment of article.commentList" :key="comment.id">
        <div>コメント者名：{{ comment.name }}</div>
        <div>コメント内容：</div>
        <pre class="content">{{ comment.content }}</pre>
      </div>
      <CommentInput :article-id="article.id" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CommentInput from "../components/commentInput.vue";

/**
 * 掲示板画面の表示機能を表すクラスコンポーネント.
 */
@Component({
  components: {
    CommentInput,
  },
})
export default class Bbs extends Vue {
  // 現在の記事一覧
  private currentArticleList = [];
  // 投稿者名
  private articleName = "";
  // 投稿内容
  private articleContent = "";
  // 投稿者名が入っていないエラー
  private articleNameError = false;
  // 投稿者名の文字数エラー
  private articleNameLengthError = false;
  // 投稿内容が入っていないエラー
  private articleContentError = false;

  /**
   * 記事一覧を表示する.
   *
   * @remarks Vuexストア内の記事一覧(articles)をcurrentArticleListに格納する
   */
  created(): void {
    this.currentArticleList = this.$store.getters.getArticles;
  }
  /**
   * 記事を追加する.
   */
  addArticle(): void {
    // 投稿入力のバリデーション
    if (this.articleName) {
      this.articleNameError = false;
    } else {
      this.articleNameError = true;
    }
    if (this.articleContent) {
      this.articleContentError = false;
    } else {
      this.articleContentError = true;
    }
    if (this.articleName.length <= 50) {
      this.articleNameLengthError = false;
    } else {
      this.articleNameLengthError = true;
    }
    if (
      this.articleNameError ||
      this.articleContentError ||
      this.articleNameLengthError
    ) {
      return;
    }
    let newId: number;
    if (this.$store.getters.getArticles.length === 0) {
      newId = 1;
    } else {
      newId = this.$store.getters.getArticles[0].id + 1;
    }
    this.$store.commit("addArticle", {
      id: newId,
      name: this.articleName,
      content: this.articleContent,
      comments: [],
    });
    this.articleName = "";
    this.articleContent = "";
  }
  /**
   * 記事を削除する.
   *
   * @param payload - 削除したい記事のインデックス
   */
  deleteArticle(payload: number): void {
    this.$store.commit("deleteArticle", payload);
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 300px;
  border: 1px solid black;
  padding: 5px;
  overflow-wrap: break-word;
}
.deleteBtn {
  margin-bottom: 10px;
  margin-left: 10px;
}
.error {
  color: red;
}
.content {
  overflow-wrap: break-word;
}
</style>
