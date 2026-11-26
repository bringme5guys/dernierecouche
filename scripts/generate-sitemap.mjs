import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

/**
 * Construit le sitemap à partir des fichiers HTML réellement produits par
 * le prérendu. Écrit à la main, il finirait par mentir : une page ajoutée
 * et oubliée, ou une page supprimée et toujours listée.
 */

const DIST = "dist";
const ORIGIN = "https://dernierecouche.com";
const EXCLUDE = new Set(["404"]);

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const paths = walk(DIST)
  .filter((f) => f.endsWith(".html"))
  .map((f) => relative(DIST, f).split(sep).join("/").replace(/\.html$/, ""))
  .filter((p) => !EXCLUDE.has(p))
  .map((p) => (p === "index" ? "/" : `/${p}`))
  .sort((a, b) => a.length - b.length || a.localeCompare(b));

const body = paths
  .map(
    (p) => `  <url>
    <loc>${ORIGIN}${p}</loc>
    <changefreq>monthly</changefreq>
    <priority>${p === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n");

writeFileSync(
  join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
);

console.log(`sitemap.xml : ${paths.length} page(s)`);
for (const p of paths) console.log(`  ${p}`);
