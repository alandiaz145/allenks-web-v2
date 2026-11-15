# Verified ALLEN KS download statistics

## Provenance

The `verifiedHistory` map in `preview-build/app.js` is sourced from Alan's
SoundCloud for Artists all-time downloads screenshot (15 November 2026):

| Song ID | SoundCloud historical downloads |
| --- | ---: |
| gods-messenger | 19 |
| go-down | 13 |
| legendary-remix | 8 |
| bust-it | 4 |
| back-strong | 3 |

Only precisely matched song IDs are seeded. Other entries from SoundCloud,
DropLoud and ToneDen are not imported until titles and versions are verified.
In particular `SPARTAN WARRIOR` is an old name for `WHAT THE FUCK`, not a
separate release. ToneDen showed zero downloads for that entry, so no badge
is created. A separate ToneDen entry for MALEVO - INSOMNIA reported four
downloads but its catalogue ID/version has not yet been reconciled.

Cloudflare historical access logs include test requests, HEAD requests and
failed URLs, so they are **not** used to seed a download counter. SoundCloud
downloads are distinct from downloads performed on allenks.com.ar.

## Durable download tracking

The existing media Worker (`worker/allenks-music-media.js`) supports a D1
database binding called `DOWNLOADS_DB`. Set up in the Cloudflare account that
owns `allenks-music-media`:

1. Create a D1 database (e.g. `allenks-downloads`). Check the account's
   billing/free-tier limits before activating it.
2. Run `worker/download-stats.sql` against that database.
3. Bind it as `DOWNLOADS_DB` on the existing deployed media Worker.
4. Deploy the revised Worker (preserve the current `MUSIC_BUCKET` R2 binding).
5. Verify `GET /stats/downloads` returns JSON with `counts`; if the binding
   is missing it returns HTTP 503 and the website displays only verified
   historical figures.

Successful non-range `GET /download/{slug}` requests increment D1 exactly
once per accepted request. The counter excludes `HEAD`, streaming, art covers,
partial range responses, failed file lookups and invalid paths. An accepted
HTTP request does *not* prove that the visitor saved the whole MP3 to disk;
the UI therefore calls these **registered downloads**, not unique people.
This does not retroactively reconstruct unavailable historical site downloads.

The public sorting option `Más descargadas` uses verified historical
SoundCloud figures plus new website requests, and hides counts of zero.
Do not deploy a pretend backend, manually inflate statistics or combine
unverified analytics with the displayed totals.
