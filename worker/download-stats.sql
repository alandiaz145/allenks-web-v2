-- Apply to the D1 database bound as DOWNLOADS_DB before deploying the Worker.
CREATE TABLE IF NOT EXISTS song_downloads (
  slug TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0 CHECK (count >= 0),
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
