# Current

## Current Phase

CheatSheet MVP implemented and verified on Windows and macOS.

## Current State

- Tauri 2 + React 19 + TypeScript + SQLiteのローカルデスクトップアプリ。
- カテゴリとCheatSheetの作成・編集・削除（表示中項目の一括削除を含む）、横断検索、コピー、JSON Import/Exportを実装済み。
- ダーク／ライトテーマ切替と、80〜140%の表示倍率変更を実装済み。設定はローカルに保持する。
- `{{VARIABLE_NAME}}` を自動検出する変数付きコマンド、変数メタデータ、入力後コピー、JSONバックアップを実装済み。
- 複数Stepを順序付きで保存するCommand Set、Step/全体コピー、セット内共有変数、Step検索、JSONバックアップを実装済み。
- Windows production buildと実行、およびApple Silicon / Intel対応macOS Universal `.app`/`.dmg` buildを確認済み。Apple Siliconでの起動とSQLite作成も確認済み。

## Known Issues

- 自動化されたTauri UI E2Eは未整備。主要UI操作は手動確認対象。

## Immediate Next

- MVPを実利用し、検索性と入力フローのフィードバックを収集する。
