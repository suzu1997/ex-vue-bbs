<template>
  <div>
    <div class="error" v-if="commentNameError">※名前を入力してください</div>
    <div class="error" v-if="commentNameLengthError">
      ※名前は50文字以内で入力してください
    </div>
    <label for="commentName">名前：</label><br />
    <input type="text" id="commentName" v-model="commentName" /><br />
    <div class="error" v-if="commentContentError">
      コメント内容を入力してください
    </div>
    <label for="commentContent">コメント：</label><br />
    <textarea id="commentContent" v-model="commentContent"></textarea>
    <br />
    <button v-on:click="addComment">コメント投稿</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class CommentInput extends Vue {
  // コメント者名
  private commentName = "";
  // コメント内容
  private commentContent = "";
  // コメント者名が入っていないエラー
  private commentNameError = false;
  // コメント者名の文字数エラー
  private commentNameLengthError = false;
  // コメント内容が入っていないエラー
  private commentContentError = false;

  @Prop()
  // 対象の記事ID
  private articleId!: number;

  /**
   * コメントを追加する.
   */
  addComment(): void {
    // コメント入力のバリデーション
    if (this.commentName) {
      this.commentNameError = false;
    } else {
      this.commentNameError = true;
    }
    if (this.commentContent) {
      this.commentContentError = false;
    } else {
      this.commentContentError = true;
    }
    if (this.commentName.length <= 50) {
      this.commentNameLengthError = false;
    } else {
      this.commentNameLengthError = true;
    }
    if (
      this.commentNameError ||
      this.commentContentError ||
      this.commentNameLengthError
    ) {
      return;
    }
    this.$store.commit("addComment", {
      id: -1,
      name: this.commentName,
      content: this.commentContent,
      articleId: this.articleId,
    });
    this.commentName = "";
    this.commentContent = "";
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
