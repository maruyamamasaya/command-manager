# Security

## Trust Boundaries

入力する本文とImport JSONは信頼しないデータとして扱う。本文はプレーンテキストとしてReactで表示し、shell、PowerShell、cmdその他の実行系APIへ渡さない。

## Data and Network

- データはローカルSQLiteのみ。認証、credential、外部DBは使用しない。
- 実行時の外部通信、telemetry、外部フォント、CDNは使用しない。
- Exportはユーザーが選択したパスへ、Importはユーザーが選択したJSONからのみ行う。
- テンプレート展開はWebView内の文字列置換とクリップボード書き込みだけを行い、入力値を送信・実行しない。秘密情報をデフォルト値として保存しないようUIで注意喚起する。

## Tauri Permissions

main windowに`core:default`とファイルダイアログのopen/saveだけを許可する。shell、HTTP、プロセス起動、任意filesystem plugin権限は付与しない。

## Input Validation

タイトルと本文を必須化し、カテゴリは外部キー、カテゴリ名とタグ名はcase-insensitive unique制約で保護する。Importはbackup versionとJSON構造を検証し、transactionで適用する。
