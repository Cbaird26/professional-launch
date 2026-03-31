# Professional Launch

Professional Launch is the store-ready launch shell for the broader `Theory of Everything Foundation` app frame. `ZoraASI` is the in-app intelligence layer and `Zora` is the engine underneath the runtime tabs.

## Public Surfaces
- Repo: `Cbaird26/professional-launch`
- Live preview: `https://cbaird26.github.io/professional-launch/`
- Privacy URL: `https://cbaird26.github.io/professional-launch/privacy.html`
- Terms URL: `https://cbaird26.github.io/professional-launch/terms.html`
- Support URL: `https://cbaird26.github.io/professional-launch/support.html`

## What This Repo Is
- The polished launch shell for phone, iPad, web, and native store packaging.
- A grounded software simulation and open-science interface.
- The app-family surface that adds Home, Manual, About, Legal, and Settings above the existing runtime tabs.

## What This Repo Is Not
- Not a frozen artifact repo.
- Not a hardware claim.
- Not an analytics-backed consumer app with cloud sync or ads.

## Identity
- App/store name: `Professional Launch`
- Foundation framing: `Theory of Everything Foundation`
- Intelligence layer: `ZoraASI`
- Engine: `Zora`
- Bundle/application id: `io.cbaird26.professionallaunch`

## Included Runtime Tabs
- `Probability Sculptor`
- `Fold-Space Engine`
- `Timeline Selector`
- `Decision`
- `Intent`
- `Navigation`
- `Autopilot`
- `Research`

## Launch Shell Sections
- `HOME`
- `APP`
- `MANUAL`
- `ABOUT`
- `LEGAL`
- `SETTINGS`

## Local State Namespaces
- Product state: `professional-launch-product-state`
- Shell state: `professional-launch-shell-state`

## Run and Verify
```bash
npm install
npm test -- --run
npm run build
npm exec cap sync
```

## Open Native Shells
```bash
npm run mobile:ios
npm run mobile:android
```

## Release Checks
```bash
npm run mobile:ios:release
npm run mobile:android:apk
npm run mobile:android:bundle
```

## Store / Launch Docs
- [Store release checklist](./docs/store-release-checklist.md)
- [Store metadata draft](./docs/store-metadata.md)
- [Privacy summary](./docs/privacy-summary.md)
- [Privacy answers draft](./docs/privacy-answers-draft.md)
- [Screenshot shot-list](./docs/screenshot-shot-list.md)
- [Support and contact copy](./docs/support-contact.md)
- [What’s new draft](./docs/whats-new.md)
