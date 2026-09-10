# Data Model

## Persistence Strategy

OSのアプリデータディレクトリにある単一SQLiteファイル。起動時に冪等migrationを適用する。

## Tables

- `categories(id, name UNIQUE NOCASE, sort_order, created_at)`
- `cheatsheets(id, category_id, title, description, content, created_at, updated_at)`
- `tags(id, name UNIQUE NOCASE)`
- `cheatsheet_tags(cheatsheet_id, tag_id)`

`categories 1:N cheatsheets`、`cheatsheets N:M tags`。外部キーを有効化し、CheatSheet削除時は中間行をcascade削除する。使用中カテゴリの削除はrestrictする。

## Lifecycle and Migration

CheatSheet更新では`updated_at`を更新する。孤立タグは削除時に清掃する。schema変更は`src-tauri/migrations`へ順序付きSQLとして追加する。
