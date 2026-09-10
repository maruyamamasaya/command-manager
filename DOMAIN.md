# Domain

## Glossary and Entities

- **CheatSheet**: タイトル、説明、本文、カテゴリ、タグを持つ個人用技術メモ。
- **Category**: CheatSheetを一つの主分類へまとめるユーザー定義項目。
- **Tag**: 複数CheatSheet間を横断する任意の検索語。
- **Template Variable**: CheatSheet本文中の `{{NAME}}` 形式で検出される、コピー時に入力・展開する値。

## Business Rules

- CheatSheetにはタイトル、本文、カテゴリが必須。
- カテゴリ名は大文字小文字を区別せず一意。
- 使用中のカテゴリは削除できない。
- 検索はタイトル、説明、本文、カテゴリ、タグを対象とする。
- Importは既存データを消さず追加し、Exportは全ローカルデータをversion付きJSONにする。
- 変数名は `[A-Z][A-Z0-9_]*`。同名変数は1つとして扱い、全出現箇所を置換する。
- 変数付き本文は全変数が入力された場合だけ展開結果をコピーし、保存本文は変更しない。

## Invariants

- 本文をアプリから実行しない。
- 永続データの正本はローカルSQLite。
