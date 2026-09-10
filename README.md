# CheatSheet

開発中に必要なコマンドや技術メモを、ローカルで検索・表示・コピーするデスクトップアプリです。Tauri、React、TypeScript、SQLiteで構築し、保存した本文を実行する機能や外部サービスへの送信機能は持ちません。

## 開発

前提: Node.js 20以上、Rust stable、WindowsではVisual Studio Build Tools（Desktop development with C++）。

```powershell
npm install
npm run tauri dev
```

検証と配布ビルド: `npm run lint`、`npm run typecheck`、`npm run test`、`npm run build`、`npm run tauri build`。

SQLiteはOSのアプリデータディレクトリ内の `dev.cheatsheet.desktop/cheatsheet.db` に保存されます。Windows向け成果物は `src-tauri/target/release/bundle/` に生成されます。

## 構成

```text
src/                       React UI、Tauri呼び出し、型、テスト
  components/              カテゴリ、一覧、詳細、編集ダイアログ
src-tauri/                 Rust/Tauriバックエンド
  capabilities/            最小権限定義
  migrations/              SQLite schema
  src/                     CRUD、検索、JSON Import/Export
decisions/                 重要な設計判断
```
