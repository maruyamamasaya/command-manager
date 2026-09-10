-- The `cheatsheets.type` column is added conditionally by migrate_command_sets()
-- because this app replays migrations at startup and SQLite has no ADD COLUMN IF NOT EXISTS.
CREATE TABLE IF NOT EXISTS cheatsheet_steps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cheatsheet_id INTEGER NOT NULL REFERENCES cheatsheets(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_cheatsheet_steps_order ON cheatsheet_steps(cheatsheet_id, sort_order, id);
