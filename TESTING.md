# Testing

## Validation Matrix

| 変更タイプ | 必要な検証 |
| --- | --- |
| React / TypeScript | lint、typecheck、unit test、Vite build |
| Rust / SQLite | cargo check、Tauri build |
| UI / desktop integration | Windows起動、DB生成、主要操作の手動確認 |

## Commands

- Fast: `npm run lint`, `npm run typecheck`, `npm run test`
- Frontend build: `npm run build`
- Desktop build: `npm run tauri build`
- Rust only: `cargo check --manifest-path src-tauri/Cargo.toml`

## Current Coverage

タグ正規化の単体テスト、TypeScript/Rustコンパイル、production bundle、Windowsプロセス起動とSQLite作成を検証する。CRUDとImport/Exportの自動integration test、UI E2Eは今後の課題。
