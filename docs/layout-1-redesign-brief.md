# Custom Layout 1 — Redesign Brief

Status: **agreed diagnosis → brief only** (no UI code in this pass).  
Source: Critical Diagnosis sparring agenda.

---

## 1. Locked product intent

### Decision: **Thesis C — Hybrid**

| Role | Job |
|------|-----|
| **Layout 1 (default)** | Hybrid listing detail: clear facts + **one** visual essay + honest tools + delayed dense specs. Default for Apartment / Studio / Townhouse / Office / Commercial (and any CMS-forced L1). |
| **Layout 2 (villa)** | Full editorial brochure: inset hero, dual editorial grids, dark highlights, villa CTA banner. Reserved for Villa (or CMS `layout-2`). |

### Why not A (pure conversion)
- Turns L1 into a boring listings-detail clone; wastes distinctive collage / dark-features language already built.
- Makes L1 and the Featured/listings catalog feel same-same.

### Why not B (maxi-editorial)
- L2 already owns “maxi-editorial.” Two brochure templates cannibalize each other and double CMS media burden.
- L1’s current drama is **dense but dishonest** (fake Floor Plan, dead Location). More drama without honest tools worsens trust.

### Why C (hybrid)
- Keeps L1’s best visual beats (full-bleed hero, one collage essay, dark features contrast).
- Cuts narrative redundancy and CTA spam.
- Differentiates cleanly from L2 without abandoning Homzen landing voice where it helps (Related, cards).

### Primary success metric

**Clarity / time-to-understanding first**, then conversion.

1. Visitor can answer in &lt;30s scroll: *what is it, where, how much, beds/baths/size, do I want a tour?*
2. Secondary: schedule/contact completion without competing mid-page CTAs.
3. Tertiary: perceived luxury (from real imagery + honest tools, not uppercase spam or floating chrome).

Explicit non-goals for this redesign wave: new color tokens, theme rework, sticky atmosphere on detail, inventing Floor Plan/Map product if CMS has no asset (then **hide** the control — do not fake it).

---

## 2. Section-by-section: keep / merge / kill / rewrite

Walk order: Hero → Overview → Lifestyle → Features → Utility → Specs → Gallery → CTA → Related.

### Hero (`PropertyDetailHero`)
| Verdict | **KEEP + rewrite behavior** |
|---------|-----------------------------|
| Keep | Full-bleed cover, title, location, price, wishlist/compare, back link. |
| Rewrite | Showcase thumb strip must be **interactive** (swap cover or open lightbox) **or** removed. Decorative-only thumbs read as broken UI. |
| Kill | Relying on thumbs that never change anything. Soft `backdrop-blur` on price/actions is optional polish later, not blocking. |
| Type | Move H1 off ALL-CAPS brochure scream → sentence / title case aligned with Homzen landing (see §3). |

### Overview intro (`PropertyIntroduction` inside canvas)
| Verdict | **KEEP slim + merge facts** |
|---------|------------------------------|
| Keep | Eyebrow “Property Overview”, tagline as H2, description body. |
| Keep once | Spec matrix (beds / baths / sqft / type) **here only** as the early fact strip. |
| Kill later | Duplicate of the same four facts inside Specs “Core Specifications” (Specs becomes amenities / deeper detail only — see Specs). |
| Rewrite | Centered max-width is fine for hybrid; do not grow this into a second lifestyle essay. |

### Lifestyle collage (`PropertyShowcaseSection`)
| Verdict | **KEEP as the single visual essay** |
|---------|--------------------------------------|
| Keep | Overlapping vertical + square composition — distinctive L1 signature. |
| Kill | Hardcoded H2 “Designed for everyday luxury” and filler “Every room is arranged…”. |
| Rewrite | Copy must be CMS-real: prefer a dedicated lifestyle blurb, else a **non-repeating** slice of description / features — never re-print the same tagline as Overview. |
| Kill / demote | Mid-section **Schedule a Viewing** outline button. Conversion belongs in hero secondary (optional), utility (if honest), and bottom CTA — not a third mid-scroll ask. |

### Overview canvas glue (`PropertyOverviewCanvas` + background wash)
| Verdict | **KEEP quiet** |
|---------|-----------------|
| Keep | Soft masked wash if photo ≠ cover (or lower opacity further). |
| Kill | Wash that is just another decode of `imageUrl` at near-invisible opacity if slots missing — prefer no photo over triple-same-image. |

### Features (`PropertyFeaturesBlock`)
| Verdict | **KEEP as contrast beat** |
|---------|---------------------------|
| Keep | Dark `hz-footer` band, feature checklist, one strong banner image. |
| Rewrite | Tear/triangle can stay if it doesn’t fight Related/landing; simplify if CMS feature lists are short (floating bar geometry breaks). |
| Kill | Extra near-invisible full-bleed banner wash + tear backdrop that reuses the same URL — one hero image in the block is enough. |

### Utility bar (`PropertyUtilityBar`)
| Verdict | **REWRITE honesty or KILL floating theater** |
|---------|-----------------------------------------------|
| Kill as-is | “Floor Plan” → Schedule dialog. “View Location” → noop. |
| Rule | Show control **only** if capability exists: floor-plan asset/URL, map coords / embed, contact. Otherwise omit. |
| Prefer | Inline or in-section actions over magic `translate-y-[62%]` float; if float stays, Specs padding must be content-driven, not fixed `pt-36`. |
| Map | L2 shares the same lies — fix pattern once in shared action contract (out of L1 code-only scope but note dependency). |

### Specs (`PropertySpecsSection`)
| Verdict | **MERGE / slim** |
|---------|------------------|
| Kill | Side cover re-show if gallery or features already used it; kill duplicate beds/baths/sqft/type grid. |
| Keep | Amenities / deeper tabs, building features — unique facts only. |
| Rewrite | `reserveFloatingBarSpace` becomes unnecessary if utility is not floating. |
| Order note | Prefer Specs **after** Gallery (desire → facts) — see IA §3. |

### Gallery (`PropertyGalleryGrid`)
| Verdict | **KEEP + move earlier** |
|---------|-------------------------|
| Keep | Mosaic + lightbox. |
| Rewrite | Drop heavy Card chrome if it fights editorial photo language; keep focus rings. |
| Order | Place **before** dense Specs (after Features or after Lifestyle essay). |

### Bottom CTA (`PropertyCtaSection`)
| Verdict | **KEEP as primary conversion sink** |
|---------|-------------------------------------|
| Keep | Schedule primary + Contact secondary + list-property link. |
| Rewrite | Ensure this is the **canonical** schedule entry (others demoted/removed). |
| Kill | Competing schedule CTAs mid-page once this exists. |

### Related (`PropertyRelatedSection`)
| Verdict | **KEEP (landing-aligned)** |
|---------|----------------------------|
| Keep | Featured-like header, `PropertyCard`, Browse All Listings. |
| Note | This section correctly uses landing type — L1 upper sections should move **toward** this voice, not pull Related back into ALL-CAPS. |

### Inquiry dialogs
| Verdict | **KEEP** as the only schedule/contact completion UI. |

---

## 3. Target information architecture (hybrid)

### Proposed scroll order

```
1. Hero (identity + price + save/compare + optional secondary contact)
2. Overview (tagline + description + ONE spec strip)
3. Visual essay (lifestyle collage — no schedule CTA)
4. Gallery (desire — lightbox)
5. Features (dark checklist — unique selling points)
6. Honest tools row (plan / map / ask — only if real)
7. Specs (amenities / deep detail — no duplicate core specs)
8. CTA band (schedule + contact)
9. Related
```

### One-job rules
- Each section: one eyebrow, one H2, one short support sentence **or** one media composition — not both essay + CTA + matrix.
- Facts appear once at the highest useful altitude (spec strip early; amenities late).
- Schedule appears once as primary (bottom CTA); Contact once as secondary there; Ask an Agent may deep-link the same dialog from tools row only.

### Media slot policy (CMS)
- Never silently fall back every slot to `imageUrl` for above-fold washes — empty slot = omit layer.
- Showcase thumbs: interactive or unused in UI.
- Lifestyle vertical/square: required for the collage beat; if missing, replace collage with a single image — do not stack duplicates.

---

## 4. Typography & UI rules (align Homzen)

### Type system (lock)
- **Eyebrow:** Poppins, 11px, semibold, uppercase, `tracking-[2px]`, `text-hz-primary` (match Featured / Related — drop `0.28em` on L1).
- **Section H2:** Poppins, semibold, **sentence / title case** (not ALL CAPS), ~30–36px desktop, `tracking-[-0.3px]`, `text-hz-ink` / `text-hz-dark`.
- **Hero H1:** Same family; large but not forced uppercase; tighten line-height ~1.1–1.15.
- **Body:** Poppins regular/medium, `text-hz-body`, leading 1.6–1.65.
- **UI chrome:** buttons/labels per Homzen button standards; brand orange only for primary CTA / highlights.

### Layout / chrome
- Prefer `section-container` gutters; avoid one-off floating % translates.
- Cards only where interaction needs a container (Related, Specs tabs) — not around every gallery tile by default.
- No new `dark:` theming; keep `hz-*` + `data-theme`.

### CTA hierarchy
| Priority | Action | Placement |
|----------|--------|-----------|
| P1 | Schedule a Viewing | Bottom CTA (primary button) |
| P2 | Contact / Ask agent | Bottom CTA outline + optional tools row |
| P3 | Wishlist / Compare | Hero only |
| P4 | Floor Plan / Map | Tools row **iff** real target |
| Avoid | Mid-essay Schedule, mislabeled Floor Plan, dead Map |

---

## 5. UX honesty contract

```
label === behavior
no asset → no control
no handler → no control
```

Shared action IDs (`plan` | `inquire` | `location`) should resolve in one place (ShowcaseView / villa handler) with capability checks. Until Floor Plan and Map backends exist, **ship without those buttons**.

---

## 6. Differentiation: L1 vs L2 (do not blur)

| | Layout 1 Hybrid | Layout 2 Villa |
|--|-----------------|----------------|
| Hero | Full-bleed edge-to-edge | Inset gutters + overlay card |
| Mid visual | One overlapping collage essay | Two editorial image/copy grids |
| Highlights | Dark features checklist | Villa highlights + utility pills |
| CTA | Split card `PropertyCtaSection` | Full dark villa banner |
| Shared | Gallery, Related, inquiry dialogs, slim specs |

If a change makes L1 look like L2’s editorial grids, reject it.

---

## 7. Out of scope (this brief)

- Implementing UI in components (next engineering pass).
- Scroll-performance work on homepage.
- Inventing floor-plan upload / map product.
- Reworking Layout 2 beyond sharing the honesty contract.

---

## 8. Acceptance criteria (for a future implementation PR)

1. No control whose label does not match its action.
2. Core specs (beds/baths/sqft/type) appear once above Specs.
3. At most one primary Schedule CTA in the scroll (bottom); lifestyle section has none.
4. Gallery appears before dense Specs.
5. L1 section headings use landing-aligned type (sentence case + `tracking-[2px]` eyebrows).
6. L1 still visually distinct from L2 (full-bleed hero + collage + dark features + split CTA).
7. Related remains Featured-like `PropertyCard` grid.
