CREATE TABLE IF NOT EXISTS template_variables (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cheatsheet_id INTEGER NOT NULL REFERENCES cheatsheets(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  default_value TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (cheatsheet_id, name)
);
CREATE INDEX IF NOT EXISTS idx_template_variables_cheatsheet ON template_variables(cheatsheet_id, sort_order);
