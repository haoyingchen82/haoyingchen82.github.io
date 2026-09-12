# Personal academic homepage

An English-only academic website built with Hugo and HugoBlox Kit, hosted on GitHub Pages.

## Content and data

- `data/authors/me.yaml`: canonical name, undergraduate role, affiliation, biography, interests, education, and approved public links.
- `content/_index.md`: homepage section order. Personal claims are read from the author data.
- `content/projects/`: research-related project bundles. The Research navigation uses `/projects/`.
- `content/publications/`: publication bundles and the Publications landing page.
- `content/experience.md`: education-focused page, reading the same author data.
- `assets/media/authors/me.jpg`: approved portrait. Hugo generates the web version.
- `assets/media/icon.svg` and `icon.png`: site monogram and raster touch icon.
- `config/_default/`: navigation, English locale, appearance, and Hugo settings.
- `assets/css/custom.css`: site-local typography, spacing, and light/dark styles.

Small local templates adapt the existing HugoBlox system:

- `functions/academic-profile.html` derives the Hero, introductory sentence, and SEO description from author data.
- `functions/get_branding.html` and `functions/get_summary.html` keep the theme's helper contracts while using canonical personal data.
- The `academic-profile` landing block presents identity, bio, interests, education, and contact.
- The `academic-project` collection view reads project front matter.
- Landing wrappers supply the main landmark and Pagefind content boundary.
- The RSS template reads canonical branding and omits unknown dates instead of publishing a year-one timestamp.
- A small navigation script closes the mobile menu after selection and supports Enter, Space, and Escape.
- A compact footer retains Hugo/HugoBlox attribution. Original software licenses remain in place.

Do not edit the Hugo module cache. This site uses the module versions in `go.mod`, package versions in `pnpm-lock.yaml`, and the deployment Hugo version in `hugoblox.yaml`.

## Local development

Requirements: existing Hugo Extended, Go, Node.js, and pnpm. Tailwind CLI is a repository dependency; do not install it globally.

For a fresh checkout, install the declared local packages with `pnpm install --frozen-lockfile`. The current workspace already has these packages.

```powershell
pnpm run dev --bind 127.0.0.1 --port 1313
```

On Windows, `pnpm.cmd` may be used instead of `pnpm`. Open **http://localhost:1313/**. Keep the server terminal running while editing and use a second terminal for Git and other checks. Stop the server with Ctrl+C after preview QA.

If Hugo or Go is installed but absent from the current terminal's PATH, prepend its existing executable directory to the **current process only**. For a WinGet Hugo installation, a reusable discovery example is:

```powershell
$hugoExe = Get-ChildItem "$env:LOCALAPPDATA/Microsoft/WinGet/Packages" -Filter hugo.exe -Recurse |
  Select-Object -First 1 -ExpandProperty FullName
if (-not $hugoExe) { throw "Locate your existing Hugo Extended executable first." }
$env:PATH = "$(Split-Path $hugoExe);$env:ProgramFiles/Go/bin;$env:PATH"
pnpm.cmd run dev --bind 127.0.0.1 --port 1313
```

Package scripts make `node_modules/.bin` available to Hugo, including the local Tailwind CLI. An executable-discovery failure is separate from Hugo's `security.exec.allow` policy. Keep the existing narrow allowlist; do not add a catch-all.

The reconstruction was previewed with the locally installed Hugo Extended 0.166.0. Deployment remains pinned to 0.162.0. The local newer version reports deprecation warnings for the inherited `imaging.quality` and `imaging.hint` settings; these are warnings, not a reason to upgrade the theme.

## Production build

After local preview QA, stop the development server and run:

```powershell
pnpm run build
```

This runs `hugo --cleanDestinationDir --minify`, followed by `pagefind --site public`. Cleaning the generated destination prevents deleted demo routes from remaining in a reused local output directory. Do not use `public/` to store source files.

`public/`, `resources/`, `node_modules/`, Hugo statistics, and the build lock are generated or local files and are ignored by Git. Search UI is currently disabled because the site is small; the build still generates a fresh Pagefind index.

## Adding content later

### Projects

Create `content/projects/<slug>/index.md` with a real title, summary, `project_type`, `project_context`, and `featured: true` when it should appear on the homepage. Add an actual date only when known. Keep methods, contributions, outcomes, and links in the project bundle. Distinguish research projects from independent implementations, learning projects, and course projects.

Only add approved public repositories or demos. Put approved result images beside the project Markdown; extend the text-first view only when such images exist. Do not invent links, dates, results, or images.

### Publications

Create real publication bundles under `content/publications/<slug>/` with verified author order, status, venue (if applicable), date, and identifiers. Use the current theme's structured publication schema. Once the first public item is added, remove the empty-state sentence from the Publications landing page. No placeholder papers or sample BibTeX are needed.

### News and research writing

When a real update is approved, create `content/news/<slug>/index.md` with an accurate date, title, and brief summary. Add a HugoBlox collection filtered to `news` only when there is content. There is deliberately no empty News section or navigation entry today.

A future English research blog can use `content/blog/`; no demo posts are retained.

### CV

When an approved public English CV exists, place it in `static/uploads/` and add its URL to the author's public links. Verify the PDF's personal information before exposing the link. No CV file or button is currently published.

## Git and deployment

- `site-redesign` is the reconstruction branch.
- `main` is the formal deployment branch.
- Existing GitHub Actions build and deploy to GitHub Pages on `main` pushes; manual workflows also exist.
- Review changes locally before considering a merge. A local build does not deploy.
- Do not commit, merge, or push reconstruction work without explicit authorization.

Retain `LICENSE.md` and applicable third-party copyright notices.
