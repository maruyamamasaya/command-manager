# Domain

## Glossary and Entities

- **CheatSheet**: タイトル、説明、本文、カテゴリ、タグを持つ個人用技術メモ。
- **Category**: CheatSheetを一つの主分類へまとめるユーザー定義項目。
- **Tag**: 複数CheatSheet間を横断する任意の検索語。

## Business Rules

- CheatSheetにはタイトル、本文、カテゴリが必須。
- カテゴリ名は大文字小文字を区別せず一意。
- 使用中のカテゴリは削除できない。
- 検索はタイトル、説明、本文、カテゴリ、タグを対象とする。
- Importは既存データを消さず追加し、Exportは全ローカルデータをversion付きJSONにする。

## Invariants

- 本文をアプリから実行しない。
- 永続データの正本はローカルSQLite。
