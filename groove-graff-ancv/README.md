# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Groove & Graff — Chèques Vacances (ANCV)

Vertical (1080x1920, 30fps, 300 frames / 10s) announcement video. Composition
`GrooveGraffAncv` (`src/GrooveGraffAncv.tsx`) sequences three scenes via
`<Series>`:

- `src/scenes/HookScene.tsx` — 0-90f: hook + ANCV card illustration
- `src/scenes/OfferScene.tsx` — 90-210f: discipline pills
- `src/scenes/CtaScene.tsx` — 210-300f: CTA + practical info

Each scene is also registered individually under the "GrooveGraffAncv-Scenes"
folder in the Studio for isolated editing/preview. Fonts (`Anton`,
`Schibsted Grotesk`) load from `src/fonts.ts`. Add a background music loop at
`public/audio/boom-bap-loop.mp3` — see `public/audio/README.md`.

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
