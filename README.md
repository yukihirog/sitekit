# sitekit


## ファイル構成

    (git repository)
        |
        +- .browserslistrc : CSSのベンダープレフィックス等に関連する、対応ブラウザの範囲指定
        +- .editorconfig : エディタ向けのフォーマット設定
        +- .gitignore : Git登録の除外ファイル指定
        +- .node-version : Node.jsの使用バージョン
        |
        +- config/ : 設定ファイルのディレクトリ
        |
        +- src/ : 開発用ディレクトリ
        +- dest/ : 出力ディレクトリ
        |
        +- gulptask/ : gulp用のタスクと設定のディレクトリ
        +- gulpfile.babel.js : 開発環境の実行内容を記述したファイル
        +- index.js : nodeの実行ファイル(gulp-cliの呼び出し)
        |
        +- node_modules/ : 開発用モジュール(最初にnpm installで作成)
        |
        +- package-lock.json : 開発用モジュールの指定ファイル
        +- package.json : 開発用モジュールの指定ファイル
        |
        +- npm_install.bat : npm installのコマンドファイル（Windows用）
        +- npm_install.command : npm installのコマンドファイル（Mac用）
        |
        +- npm_run_dev.bat : npm run devのコマンドファイル（Windows用）
        +- npm_run_dev.command : npm run devのコマンドファイル（Mac用）
        |
        +- npm_run_release.bat : npm run releaseのコマンドファイル（Windows用）
        +- npm_run_release.command : npm run releaseのコマンドファイル（Mac用）
        |
        +- README.md : この説明ファイル


## 導入方法

### 1. Node.jsのインストール

以下のサイトから「X.X.X LTS」をダウンロード＆インストールしてください。

https://nodejs.org/


### 2. 開発モジュールのインストール

コマンドラインから以下を実行してください。

    cd このディレクトリ
    npm install


## 起動と終了

### 起動

 + `cd このディレクトリ`
 + `npm run dev`
   * この時点でブラウザ（+BrowserSync）が起動し、watch（ファイル更新の監視）が始まります。
   * srcディレクトリで開発を進めると、destディレクトリに内容が反映されます。

### 終了

 + コマンドラインでCtrl+Cを押す（プレビューとwatchの終了）


## npmコマンド一覧

    # npm run start build のようにタスク名をつなげて呼び出すことができます
    npm run start

    # srcからdestに出力
    npm run build

    # buildを実行し、BrowserSyncとwatchの起動
    npm run dev

    # destディレクトリを削除した後、srcからdestに出力（リリース用、.mapファイルなどを作らない）
    npm run release


## 注意

 * `.gitignore`ファイルに`.env`と`docker-compose.yml`の記述があります。
   * これらのファイルに既存サイトの設定などが記述されることも考慮しているため、外部ユーザーにログイン情報等が漏れないように設計したためです。
 * `.gitignore`ファイルに`02_fixed/**/.htaccess`、`02_fixed/**/wp-config.php`の記述があります。
   * これは`02_fixed`ディレクトリに既存サイトの設定ファイルなどが保存されることも考慮しているため、外部ユーザーにログイン情報等が漏れないように設計したためです。
   * これらのファイルは`01_src`ディレクトリにプレビュー用のファイルを作成してください。
 * `release`コマンドは`04_release`ディレクトリに`.htaccess`と`wp-config.php`を意図的に出力しません。
   * これは`01_src`ディレクトリに開発用の`.htaccess`と`wp-config.php`を配置するように設計したためです。
   * 本番サーバーにほとんどアップロードする機会がないことも理由のひとつです。
   * 変更したい場合は`gulp_task/config.js`の`ignore.release`を編集してください。
 * `.gitignore`ファイルに`03_preview`ディレクトリの記述があります。
