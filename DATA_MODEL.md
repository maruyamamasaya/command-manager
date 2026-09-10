# Data Model

## Persistence Strategy

OSのアプリデータディレクトリにある単一SQLiteファイル。起動時に冪等migrationを適用する。

## Tables

- `categories(id, name UNIQUE NOCASE, sort_order, created_at)`
- `cheatsheets(id, category_id, title, description, content, created_at, updated_at)`
- `tags(id, name UNIQUE NOCASE)`
- `cheatsheet_tags(cheatsheet_id, tag_id)`
- `template_variables(id, cheatsheet_id, name, default_value, description, sort_order, created_at, updated_at)`

`categories 1:N cheatsheets`、`cheatsheets N:M tags`。外部キーを有効化し、CheatSheet削除時は中間行をcascade削除する。使用中カテゴリの削除はrestrictする。

`cheatsheets 1:N template_variables`。本文は `{{VARIABLE_NAME}}` を含む未展開テキストを正本として保持し、変数行は任意メタデータのみを保持する。

## Lifecycle and Migration

CheatSheet更新では`updated_at`を更新する。孤立タグは削除時に清掃する。schema変更は`src-tauri/migrations`へ順序付きSQLとして追加する。
