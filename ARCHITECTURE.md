# Architecture

## System Overview

単一プロセスのTauriデスクトップアプリ。React UIは型付きTauri commandを呼び、Rust層だけがSQLiteとローカルJSONファイルへアクセスする。

## Technology Stack

- UI: React 19、TypeScript、Vite
- Desktop: Tauri 2 / Rust
- Persistence: bundled SQLite（rusqlite）

## Major Components

- `src/components`: 3ペインUI、Single Command / Command Set編集フォーム、セッション内共有の変数入力。
- `src/api.ts`: UIとRust command間の境界。将来の同期実装でもUIのデータ契約を維持する。
- `src-tauri/src/lib.rs`: DB初期化、CRUD、検索、Import/Export。
- `src-tauri/migrations`: version管理されたschema。

## Data Flow

ユーザー操作 → React → Tauri IPC → Rust command → SQLite。コピーだけはWebViewのClipboard APIを使用する。Import/Exportはユーザーがファイルダイアログで明示選択したパスだけを処理する。

## External Services

なし。実行時ネットワーク通信は不要。

## Key Constraints

保存本文は表示・検索・コピー専用で実行しない。SQLiteが正本。OS固有処理はTauri境界へ閉じ込める。
