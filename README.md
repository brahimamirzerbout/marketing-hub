# Monochrome component foundation

A standalone Next.js App Router project reproducing the shadcn/ui homepage's
neutral shell, hero proportions, component previews, and responsive card-grid
structure, with original supporting copy and functional demonstrations.
Light mode is the default. Dark and system preferences remain available.

This is an independent reference project, not the official shadcn/ui website.
The Marketing Hub and its dependencies were not changed.

## Run

Requires Node.js 20.9 or newer. The supplied lockfile pins the tested install.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:3012` on the computer running the project.

```sh
npm test
npm run typecheck
npm run build
npm start
```

The build creates `out/`, a static export suitable for static hosting.
`npm start` serves that build locally, including extensionless page routes.
To use standard Next.js server hosting instead, remove `output: "export"` from
`next.config.ts` and use `next start` after building.

## Included

- Homepage: sticky navigation, responsive menu, theme switching, Cmd/Ctrl + K
  search, hero, interactive sampler, responsive card ecosystem, full dashboard,
  original feature sections, and linked footer.
- `/components`: 67 navigable, filterable live examples. The preview theme
  control synchronizes the document theme so portaled dialogs and menus match.
- `/blocks`: dashboard and reusable goal, savings, and assistant blocks.
- `/charts`: grayscale chart with tooltip and readable data table.
- `/themes` and `/create`: light/dark comparison and copyable neutral tokens.
- `/templates`: homepage and dashboard compositions.
- `/docs` and `/about`: project instructions, limitations, and attribution.
- `components/ui`: editable shadcn-derived primitives and local additions.

Tailwind 4 uses CSS-first configuration in `app/globals.css`; there is no
legacy JavaScript Tailwind config. `components.json` records the neutral
Radix Nova setup for future component additions. Existing preview primitives
retain the mixed source-derived styling used by the reference homepage;
Nova is not a substitute for its complete site layout. Geist font files are bundled through the installed package,
so builds do not need to fetch Google Fonts.

## Source of truth

The official repository was inspected at commit
`daaf156ee00ed91cc7e6bdd937c1b4973152d141` on October 18, 2026:
https://github.com/shadcn-ui/ui/tree/daaf156ee00ed91cc7e6bdd937c1b4973152d141/apps/v4

Selected original files are preserved under `reference/upstream/`, together
with the MIT license. They are excluded from TypeScript and Tailwind scanning.
See `SOURCE-COMPARISON.txt` for mappings and intentional differences.

## State and data boundaries

All financial records are fixtures. Forms use component state, not a database.
Changing routes or filtering a demo out of the catalog can reset that demo.
The chat streams a scripted response. Selected attachment names stay local;
files are not uploaded. The QR code is deliberately an illustrative placeholder.
No authentication, payment, analytics, or AI service is connected.

The theme preference is the only persisted setting, through next-themes local
storage. GitHub stars are a dated reference observation, not a live API value.

## Release gate

This has not been deployed. Review `QA.txt` before publishing. Browser DOM and
viewport checks do not constitute pixel-perfect screenshot or complete WCAG
certification. The user requires visual approval before deployment.

## License

The shadcn-derived code retains its MIT notice in `THIRD-PARTY-LICENSES.txt`.
All installed dependencies retain their own upstream license notices.

## Full catalog update

Installed all 64 registry component entries with shadcn CLI 4.22.1 using the
existing radix-nova / neutral configuration. New registry files are local;
previously customized primitives retain their existing APIs and accessibility
fixes. The Combobox registry entry itself uses Base UI even in the Radix family;
@base-ui/react is an upstream requirement, not a switch of the whole project.
Data Table, Date Picker and Typography remain composed demonstrations. Sonner
provides the toast implementation. Form and Timeline are additional examples.

Shared utilities are imported from shadcn/tailwind.css. The exact Neutral core
background, foreground and radius remain in globals.css. Destructive and chart
tokens deliberately stay grayscale instead of the upstream colored defaults.
New code examples render syntax in neutral foreground, including the optional
highlighter helper. The local cn utility remains the class-merging authority.

Trace statuses are illustrated fixtures, with complete text labels. A completed
step omits status; it does not pass status="none". Collapsible rows use Radix
buttons and expose expansion state. No commands execute from this showcase.

Required catalog dependencies include Vaul, Embla, react-day-picker/date-fns,
input-otp, react-resizable-panels, @shadcn/react, Base UI and Shiki. The shadcn
package provides build-time CSS utilities. Next.js was patched to 15.5.28.

Official references:
- https://ui.shadcn.com/docs/components
- https://ui.shadcn.com/docs/theming
- https://ui.shadcn.com/docs/cli
- https://ui.shadcn.com/docs/components/radix/trace
