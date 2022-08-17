import path from 'path';

const cwd = path.resolve(process.cwd());

export default {
  // productionやdevelopの切り替え指定
  mode: process.env.NODE_ENV || 'develop',

  // ソースコードのディレクトリ
  src:  path.resolve(cwd, './src/'),

  // 出力先のディレクトリ
  dest: path.resolve(cwd, './dest/'),

  // プレビューの設定
  server: {
    // URLの/に対応するディレクトリ
    baseDir: path.resolve(cwd, './dest/'),

    // URLが/で終わる時に探すファイル名
    index: 'index.html',

    // プレビュー用のブラウザを開いた時、最初に表示するパス
    startPath: '/',

    // PHPを使う時に裏で動かすサーバーのポート番号
    phpPort: 8000,
  },

  // HTML処理をする時の変数
  vars: {
    // 全ページ共通の変数
    global: {
      host: 'https://www.___.com/'
    },

    // 個別ページ
    '/': {}
  }
}