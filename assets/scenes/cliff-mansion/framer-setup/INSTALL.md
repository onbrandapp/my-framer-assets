# Replace the Framer scene — keep your edited component

**You do not need to replace the hero code.** Upload the new assets, then change its settings. Keep your layout edits, section-link patch, smoother loader and six-screen stage.

## 1. Upload individual assets to your existing host

Unzip `cliff-mansion-framer-assets.zip`. Copy the included `assets/scenes/cliff-mansion/` folder into your existing `my-framer-assets` GitHub Pages repository, preserving its folders. Upload the **individual files**, not the ZIP. Keep the old `assets/frames/` and poster intact for rollback.

New structure:

```text
assets/scenes/cliff-mansion/
  poster.webp
  final.webp
  frames/
    frame_0001.webp ... frame_0721.webp
    manifest.json
  frames-mobile/
    frame_0001.webp ... frame_0721.webp
    manifest.json
```

The following URLs assume you place the files at exactly those paths in your current repository. **They are installation targets, not assets already uploaded for you.** After GitHub Pages finishes deployment, open the poster and first/last frame URLs in a browser and check they load before changing Framer.

## 2. Update these hero controls

```text
Frames URL:
https://onbrandapp.github.io/my-framer-assets/assets/scenes/cliff-mansion/frames/

Poster URL:
https://onbrandapp.github.io/my-framer-assets/assets/scenes/cliff-mansion/poster.webp

Frame count: 721
Scroll screens: 6
```

Keep your navigation URL settings and hero-link patch. No JSX, CSS, headline or feature-box changes are required. If your file uses hardcoded values instead of property controls, change only `framesUrl`, `posterUrl` and `frameCount` in the `SolvoraHero` defaults/props. Controls on an existing instance may override code defaults, so check the actual instance values too.

## 3. Update the following sections' backdrop

On the **SolvoraExtension** instance, set **Final frame** to:

```text
https://onbrandapp.github.io/my-framer-assets/assets/scenes/cliff-mansion/final.webp
```

If you do not use the five-section extension, skip this step. If that component is hardcoded, change only its `finalFrameUrl`. `poster.webp` and `final.webp` are byte-identical, so the same exterior composition remains behind the later sections.

## 4. Optional adaptive quality — recommended

Desktop frames are **1920×1080, WebP quality 90**, approximately **177.3 MiB** for the full set. The lighter frames are **1280×720, quality 88**, approximately **92.9 MiB**. These are larger than the old scene because this scene is longer and detailed moving ocean texture compresses less efficiently. The existing loader remains bounded and prioritizes nearby frames; it does not retain the entire desktop set in its 64 MiB compressed cache. A first visit can still pause on a slow connection. 4K frames are deliberately not used in the browser.

To select the lighter set automatically on narrow screens or data-saving/2G connections, create a Framer file `useCliffFrameSource.tsx` with the supplied contents. Then make only these small edits in **your current hero file**:

```tsx
// Alongside your imports:
import { useCliffFrameSource } from "./useCliffFrameSource.tsx"

// Inside SolvoraHero, before the existing useSequence call:
const activeFramesUrl = useCliffFrameSource(framesUrl)

// In your EXISTING useSequence call, replace only its framesUrl argument:
const status = useSequence(
  stage, canvas, activeFramesUrl,
  Math.max(1, Math.round(frameCount)), staticPreview
)
```

Do not replace `useSequence` itself. Preserve your other arguments if you customized them. The hook only changes a URL ending in `/cliff-mansion/frames` to its sibling `/cliff-mansion/frames-mobile`; it leaves any other configured scene URL unchanged. Both sets contain 721 synchronized slots, so all timing and links remain the same. Changing the breakpoint reinitializes the loader for the selected set.

**No-code lighter option:** set Frames URL to the `frames-mobile/` folder for every device. This is still 720p, matching the previous scene's dimensions, with a longer tour. Use the 1080p folder for sharper desktop detail if you prefer not to add the hook.

## 5. Test and publish yourself

- Test Framer Preview, not only its canvas: scroll forward/backward, visit the interior, return to Home, test every section link and both mobile/desktop widths.
- First frame is `frame_0001.webp`; last is **`frame_0721.webp`**, not the previous 453.
- Parent overflow stays Visible; avoid transformed/contained ancestors that can break sticky/fixed layers.
- Confirm the new poster is visible and all subsequent sections show the cliffside scene, not the old house.
- Publish through Framer when satisfied. Nothing here edits or publishes your live Framer site automatically.

## Deliverables and provenance

- `cliff-tour-4k-master.mp4`: **3840×2160 upscaled** silent master, 577 frames at 24 fps, about 24.04 seconds. Native generated footage is 1080p, not native 4K. Approved plate is pinned at the two endpoint slots before lossy video encoding.
- `cliff-tour-1080p-endpoint-matched.mp4`: silent 1080p viewing/export version, 721 slots at 30 fps, about 24.03 seconds.
- `cliff-tour-lossless-frames-30fps.zip`: **721 PNGs at 1920×1080** (~2.1 GiB). Lossless means lossless extraction/storage from the compressed generated film, not recovery of detail lost in that source. Keep this for editing; do not host these PNGs for your website.
- `cliff-mansion-framer-assets.zip`: both optimized WebP sets, manifests, poster and backdrop.
- `cliff-mansion-16x9-4k.png`: approved expanded/upscaled opening/ending plate.

Native generation was 24 fps. Export to 30 fps duplicates some slots; it is not optical-flow interpolation or new motion detail. First and last PNGs are identical approved-plate resizes; each WebP set also has byte-identical first/last files. Adjacent generated frames have slight detail/tonal differences from the plate, so do not interpret exact endpoint files as a guarantee of a mathematically seamless moving-water loop. No crossfade, reverse playback or hidden cut was added. The imagined lounge is AI-generated, and the rendered camera timings vary from the requested beat schedule.

The managed preview, image files and archives were checked locally; no actual installation in your Framer editor or deployment of the new GitHub paths was performed.
