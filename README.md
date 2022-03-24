# sitekit

このリポジトリをforkしてご利用ください。

fork後、アップデートを取り込むためには以下のコマンドが必要です。

    git remote add upstream https://github.com/yukihirog/sitekit.git

Gitのforkについての詳細は`git fork 取り込み`等で検索してください。


## ファイル構成

    (git repository)
        +- .env : Dockerとgulpの共有設定ファイル(最初に手作業で作成する)
        +- .env.sample : .envを作成する際の雛形
        +- .gitignore : Git登録の除外ファイル指定
        |
        +- 01_src/ : 開発用ファイルのディレクトリ
        +- 02_fixed/ : 開発時に編集しないファイルのディレクトリ
        +- 03_preview/ : ローカルプレビュー用のディレクトリ(01_srcと02_fixedから作成)
        +- 04_release/ : 開発終了時に01_srcから作成されるディレクトリ
        |
        +- docker/ : Docker用のディレクトリ
        +- docker-compose.yml : Docker用の設定ファイル(最初にnpm run start initfilesで作成する)
        +- docker-compose.yml.base : docker-compose.ymlを生成するテンプレート
        |
        +- gulp_task/ : gulp用のタスクと設定のディレクトリ
        +- gulpfile.babel.js : 開発環境の実行内容を記述したファイル
        +- index.js : nodeの実行ファイル(gulp-cliの呼び出し)
        |
        +- LICENSE : ライセンス
        |
        +- node_modules/ : 開発用モジュール（install.bat/install.commandを実行時に作成されます）
        |
        +- package-lock.json : 開発用モジュールの指定ファイル
        +- package.json : 開発用モジュールの指定ファイル
        |
        +- README.md : この説明ファイル


## 導入方法

### 1. Node.jsのインストール

以下のサイトから「X.X.X LTS」をダウンロード＆インストールしてください。

https://nodejs.org/


#### 古いNode.jsが既にインストールされている場合

以下のコマンドで最新版にアップデートされます。

```
npm update -g npm
```

##### nが入っている場合

```
n lts
```


### 2. .envファイルの作成

`.env.sample`ファイルをコピーして`.env`ファイルを作成してください。

その後、自分の開発環境に合わせて編集してください。

（`.env`ファイルが作成されていない場合は初回の`npm run start`時に、自動的に`.env.sample`ファイルの内容で`.env`ファイルが作成されます）


### 3. 開発モジュールのインストール

コマンドラインから以下を実行してください。

    cd このディレクトリ
    npm install


### 4. Dockerのインストール

以下のサイトから「Docker Desktop」をダウンロード＆インストールしてください。

（Dockerを使わない場合は不要です）

https://www.docker.com/get-started/

Dockerは必須ではありません。

データベースやPHPが必要なければ、sitekitではBrowserSyncを使ったプレビューも可能です。


### 5. Dockerコンテナの作成

Dockerアプリを起動した後、コマンドラインから以下を実行してください。

（Dockerを使わない場合は不要です）

    docker compose up -d

MySQLサーバーが完全に起動するまで数十秒程度かかる場合があります。

起動の確認は、DockerアプリのDBコンテナのLOGSに以下が出力されるのを待ってください。

    Version: '5.7.37'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)

このログが確認できるまでphpMyAdmin等からDBにアクセスできません。


### 6. 初期化

コマンドラインから以下を実行してください。

空のディレクトリや設定ファイルが作成されます。

    npm run initfiles

（Macを使っていてM1等のApple系チップを使っている場合は`docker-compose.yml`ファイルから`#platform: ${PLATFORM}`の`#`を削除してください）


### 7. 02_fixedディレクトリに必要ファイルを格納する

02_fixedディレクトリに編集しないが必要なファイルを格納してください。

外部のJSライブラリやWordpress等の本体がこれに該当します。


### 8. build

コマンドラインから以下を実行してください。

02_fixedディレクトリの内容が03_previewディレクトリにコピーされます。

    npm run build


## 起動と終了

### Dockerを使用する場合

 + Dockerアプリを起動する
 + `cd このディレクトリ`
 + `docker compose up -d` （Dockerコンテナの起動）
   * phpMyAdminには http://localhost:4040 でアクセスできます。
 + `npm run dev` （プレビューとwatchの起動）
   * この時点でブラウザ（+BrowserSync）が起動し、watch（ファイル更新の監視）が始まります。
   * 01_srcディレクトリで開発を進めると、03_previewディレクトリに内容が反映されます。
   * ブラウザでは、BrowserSyncを通してDockerのサーバーを閲覧しています。

#### 終了

 + コマンドラインでCtrl+Cを押す（プレビューとwatchの終了）
 + `docker compose down` （Dockerコンテナの終了）

### BrowserSyncを使用する場合（Dockerを使用しない場合）

 + `cd このディレクトリ`
 + `npm run devBS`
   * この時点でブラウザ（+BrowserSync）が起動し、watch（ファイル更新の監視）が始まります。
   * 01_srcディレクトリで開発を進めると、03_previewディレクトリに内容が反映されます。

#### 終了

 + コマンドラインでCtrl+Cを押す（プレビューとwatchの終了）


## npmコマンド一覧

    # npm run start build のようにタスク名をつなげて呼び出すことができます
    npm run start

    # 初期化
    npm run initfiles

    # 03_previewディレクトリに02_fixedのファイル、01_srcからの出力の順にファイルを書き込み
    npm run build

    # 03_previewディレクトリを空にした後、buildを実行
    npm run clearbuild

    # buildを実行し、BrowserSyncとwatchの起動
    # サーバーはBrowserSync
    npm run devBS

    # buildを実行し、BrowserSyncとwatchの起動
    # サーバーはDocker
    npm run dev

    # 04_releaseディレクトリを空にした後、01_srcからの出力ファイルを書き込み
    npm run release


