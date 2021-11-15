import { Article } from "@/types/article";
import { Comment } from "@/types/comment";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    // 記事一覧の情報
    articles: [
      new Article(3, "佐藤", "佐藤さんの記事", []),
      new Article(2, "山田", "山田さんの記事", [
        new Comment(13, "山崎", "山崎さんのコメント", 2),
      ]),
      new Article(1, "伊藤", "伊藤さんの記事", [
        new Comment(12, "鈴木", "鈴木さんのコメント", 1),
        new Comment(11, "吉田", "吉田さんのコメント", 1),
      ]),
    ],
  }, // end state
  mutations: {
    /**
     * 記事を追加する.
     *
     * @remarks 受け取ったpayload内のarticleをstateのarticlesの0番目に追加
     * @param state - Vuexのstateオブジェクト
     * @param payload - 新しい記事
     */
    addArticle(state, payload) {
      state.articles.unshift(
        new Article(payload.id, payload.name, payload.content, payload.comments)
      );
    },
    /**
     * コメントを追加する.
     *
     * @param state - Vuexのstateオブジェクト
     * @param payload - 新しいコメント
     */
    addComment(state, payload) {
      // コメントを追加する記事を検索
      const article = state.articles.find(
        (article) => article.id === payload.articleId
      );

      // 現在のコメントの最大のコメントIDを取得
      let maxCommentId = 0;
      for (const article of state.articles) {
        for (const comment of article.commentList) {
          if (comment.id > maxCommentId) {
            maxCommentId = comment.id;
          }
        }
      }
      // 最大のコメントIDに1を足したものを新しいコメントIDとする
      const newCommentId = maxCommentId + 1;
      const newComment = new Comment(
        newCommentId,
        payload.name,
        payload.content,
        payload.articleId
      );
      console.log(newComment);

      if (article) {
        article.commentList.unshift(newComment);
      } else {
        throw new Error("予期しない記事IDが渡されました");
      }
    },
    /**
     * 記事を削除する.
     *
     * @param state - Vuexのstateオブジェクト
     * @param payload - 削除する記事のID
     */
    deleteArticle(state, payload) {
      state.articles.splice(payload, 1);
    },
  },
  getters: {
    /**
     * 記事一覧を返す.
     *
     * @param state - Vuexのstateオブジェクト
     * @returns 記事一覧
     */
    getArticles(state) {
      return state.articles;
    },
  },
});
