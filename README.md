# PSUT Center of Consultation and Training website

Plain HTML, CSS and JavaScript. No build step: double-click `index.html` to open it.

```
index.html                 Home page (providers)
html/                      One file per page: AWS, Oracle, Cisco, Microsoft, RedHat,
                           RedHat-Enroll, Microsoft-Enroll
css/Shared_Style.css       Colours, fonts, header, nav, buttons, animations (used by every page)
css/<Page>.css             Styles for just that page
js/Shared_Script.js        Behaviour used by every page (scroll buttons, fade-in, header shadow)
js/<Page>.js               Starts the page (each file is a few lines)
assets/images/             Logos, photos, badges, icons
backups/                   Local safe copies made before big changes (kept on your computer only, not on GitHub; see "Restore" below)
```

**All text lives in the HTML files.** JavaScript never writes text; it only adds behaviour.

## How to change things

| I want to... | Edit |
| --- | --- |
| Change any wording (headings, paragraphs, course descriptions, button labels) | The page's HTML file in `html/` (or `index.html`). Use find (Cmd+F) for the old text. |
| Edit one course card | Open the provider page and find the card by its comment, e.g. `<!-- 3. Cloud Architecting Course -->`. Change the title (`<h3>`) and description (`<p>`). |
| Add a course | Copy a whole `<li> ... </li>` card (from its comment to the closing `</li>`), paste it after the last card and edit the text. |
| Remove a course | Delete that card, including its comment. |
| Change where a button goes | Change its `href="..."` in the HTML. |
| Change a course registration form link | Search for `docs.google.com/forms` in the provider's HTML (`html/AWS.html`, `Oracle.html`, `Cisco.html`, `RedHat-Enroll.html`, `Microsoft-Enroll.html`) and replace the address in `href`. |
| Add the remaining links (Red Hat Academy site, WhatsApp group, Microsoft Learn registration) | In `html/RedHat-Enroll.html` and `html/Microsoft-Enroll.html`, search for `TODO LINK` and follow the comment above each spot. |
| Rename a nav item or add a page to the nav | The `<nav class="site-nav">` block near the top of **every** page (the same block is repeated). |
| Change the contact email | Search for `bayan@psut.edu.jo` in `html/RedHat-Enroll.html` and `html/Microsoft-Enroll.html`. |
| Change a colour | `css/Shared_Style.css`, the `:root { ... }` block at the top (blue, navy, etc.). A provider's accent colour is at the top of its own CSS file. |
| Change animation speed or feel | `css/Shared_Style.css`, the `--ease-*` values at the top and the "8. Motion" section. |
| Change a photo or logo | Replace the file in `assets/images/` using the same file name. |

After editing, refresh the page in the browser (hold Shift while clicking refresh if you still see the old version).

## Restore if something breaks

`backups/before-refactor-2026-10-05/` is a full copy of the site as it was before the text was moved into HTML. To go back to it, run this in the project folder:

```bash
cp -R backups/before-refactor-2026-10-05/. .
```

To restore a single file, copy just that file, for example `cp backups/before-refactor-2026-10-05/html/AWS.html html/AWS.html`.
Before any future big change, make another copy: `cp -R index.html html css js assets backups/<new-name>/`.
