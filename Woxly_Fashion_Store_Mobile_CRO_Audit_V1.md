# Woxly Fashion Store — Mobile Commerce & CRO Audit

## 1. Audit Metadata

- **Theme:** Fashion Store
- **URL:** https://woxly-fashion.vercel.app/
- **Audit version:** V1
- **Primary viewport:** 390 × 844 px mobile web
- **Secondary widths considered:** 360, 375, 412, 430 px
- **Theme category:** Fashion & lifestyle
- **Catalog type:** Medium/large catalog capable
- **Audit date:** 2026-10-09
- **Audit method:** Live URL structure/content inspection, product/category/policy page inspection, CRO and white-label review. Exact rendered pixel dimensions, tap-target measurements, sticky behavior, keyboard behavior, cart/checkout execution, animation quality, Core Web Vitals, and payment execution were **NOT VERIFIED** in this chat session and require screenshot/device/browser QA.

### Score

- **Mobile CRO score (normalized): 59/100**
- **Weighted mobile contribution:** 41/70
- **Desktop score:** 68/100 (weighted 14/20; structural/content comparison only)
- **Cross-platform / technical quality:** 6/10
- **Overall conversion readiness:** **61/100 — promising structure, not production-ready because of trust/content/data inconsistencies**

## 2. Executive Summary

The Fashion Store theme has a broad ecommerce structure: promotional entry points, category discovery, best sellers/new arrivals, product cards, PDP variants, pincode checking, offers, trust cues, recommendations, reviews, policies, support, and payment-method signals.

The biggest problem is not missing ecommerce components. It is **trust consistency and decision clarity**. The live theme exposes conflicting currencies, mismatched store identities, placeholder policy content, likely demo-data leakage, collection-context ambiguity, and offer-code inconsistency. These defects can make a mobile shopper think the store is unfinished or unsafe even when the checkout technology works.

The most important P0 work is therefore to establish a white-label content/data contract across storefront, PDP, policies, footer, offer system, currency, and category context before further visual polish.

### Top conversion problems

1. Currency mismatch between homepage merchandise and PDP pricing.
2. Merchant identity mismatch: Woxly / Mini Mart / grocery copy / fashion positioning.
3. Placeholder and conflicting policy/contact/location data.
4. Product-specific data leakage/mismatch in materials and reviews.
5. Collection context and offer messaging are not reliably coherent.

### Top opportunities

1. Build a global white-label storefront data contract and validation layer.
2. Make the first mobile viewport product/discovery-led with compact chrome.
3. Simplify PDP offer hierarchy and surface delivery/returns clearly around purchase action.
4. Standardize product-card, PLP, sticky ATC, cart, and checkout interaction patterns across all themes.
5. Add admin guardrails so merchant content cannot create contradictory or broken storefront states.

## 3. P0 — Conversion Blockers

### REC-FAS-P0-001 — Currency consistency

- **Page:** Homepage + PDP + PLP
- **Component:** Product price
- **Current behavior:** Homepage product merchandising includes dollar-formatted prices while PDP uses INR/₹.
- **Problem:** Shoppers cannot confidently understand the real selling currency.
- **Required behavior:** A store must expose exactly one active storefront currency unless multi-currency is intentionally enabled.
- **Implementation recommendation:** Bind every price renderer to a single store-level currency formatter. Never hardcode symbols in theme components.
- **Acceptance criteria:**
  - Every product price, compare-at price, discount amount, cart total, shipping fee and checkout total uses the configured storefront currency.
  - Changing merchant currency updates all theme surfaces without code edits.
  - No static `$`, `₹`, `Rs.` or other symbol remains in component copy.

### REC-FAS-P0-002 — White-label identity integrity

- **Page:** Global/footer/policies/contact
- **Component:** Store identity
- **Current behavior:** Fashion storefront branding coexists with “Mini Mart,” grocery/supermarket copy, Woxly identity, and location-specific text.
- **Problem:** The customer cannot tell which business they are buying from.
- **Required behavior:** One merchant identity must drive logo/name/footer/policy/contact/copyright text.
- **Implementation recommendation:** Introduce store-level fields for legal/store name, support email, support phone, description, city/address, copyright label, and policy identity. Theme components must consume only these values.
- **Acceptance criteria:** No unrelated demo brand appears after merchant setup. Missing fields use safe omission, not sample data.

### REC-FAS-P0-003 — Policy placeholder blocking production

- **Page:** Returns
- **Component:** Return address
- **Current behavior:** Return policy includes `[INSERT RETURN ADDRESS]`.
- **Problem:** A shopper checking return safety before payment sees unfinished legal/support information.
- **Required behavior:** Publish a real configured address or intentionally hide the return-address section until configured.
- **Implementation recommendation:** Add publish validation that prevents placeholder/default tokens from reaching production storefronts.
- **Acceptance criteria:** No bracketed placeholder tokens can appear on public policy pages.

### REC-FAS-P0-004 — Product data integrity

- **Page:** PDP
- **Component:** Product attributes/reviews
- **Current behavior:** Product-specific data is not reliably coherent. Example: a linen cushion cover exposes a material field referring to organic cotton/merino blend, and review language references wearing/hemming the item.
- **Problem:** Buyers interpret mismatched details and reviews as fake, copied, or broken data.
- **Required behavior:** All PDP content must be sourced from the current product or category-appropriate fields.
- **Implementation recommendation:** Remove hardcoded demo PDP details/reviews from reusable theme components. Enforce product ID binding and empty-state behavior.
- **Acceptance criteria:** No review, attribute, media, stock state, title, or description from Product A appears on Product B.

## 4. P1 — High Impact Improvements

### REC-FAS-P1-001 — Mobile first-viewport efficiency

- **Page:** Homepage/PDP
- **Component:** Announcement + header + hero/product media
- **Current state:** The theme uses a promotional announcement plus campaign-heavy homepage structure.
- **Problem:** On mobile, stacked chrome can consume the most valuable part of the viewport before shoppers see useful merchandise.
- **Required change:** Cap announcement/header height and prioritize product/category/offer comprehension in the first 844 px.
- **Mobile behavior:** Aim for announcement ~28–32 px, main header ~52–60 px where design permits; avoid a hero so tall that no next action/product cue appears.
- **Desktop behavior:** Can use more breathing room without copying mobile constraints exactly.
- **Priority:** P1
- **Expected impact:** Faster discovery, lower bounce, stronger first-scroll depth.

### REC-FAS-P1-002 — Offer hierarchy

- **Page:** Global + PDP
- **Component:** Announcement/offers
- **Current state:** Global announcement presents a 10% code while PDP presents separate bank and first-order offers.
- **Problem:** Shopper has to compare multiple codes mentally and may not know which applies.
- **Required change:** Create one primary saving, one secondary saving, then payment benefits.
- **Mobile behavior:** PDP should show best immediately available saving first; collapse lower-priority offers into “View all offers.”
- **Priority:** P1
- **Expected impact:** Less cognitive load and fewer checkout coupon exits.

### REC-FAS-P1-003 — Category context clarity

- **Page:** PLP
- **Component:** Heading/filter state
- **Current state:** A URL filtered to `category=women` still presents “All Products.”
- **Problem:** Shoppers cannot confidently confirm that a category tap worked.
- **Required change:** Heading, breadcrumb, product count, applied-filter chip and URL/query state must agree.
- **Priority:** P1

### REC-FAS-P1-004 — PDP purchase sequence

- **Page:** PDP
- **Component:** Core product information
- **Required sequence:** Media → title → rating/reviews → price/saving → short benefit → variants → primary offer → delivery/pincode → Add to Bag → concise returns/COD/shipping trust → supporting details → reviews → recommendations.
- **Problem addressed:** Current theme contains the necessary elements, but mobile success depends on sequencing rather than mere presence.
- **Priority:** P1

### REC-FAS-P1-005 — Physical-store assumptions

- **Page:** Homepage
- **Component:** Campaign sections
- **Current state:** Content includes “Shop In-Store Now!” / store-locator language.
- **Problem:** White-label merchants may be online-only.
- **Required change:** Physical-store modules must be merchant-configurable and hidden by default when no store locations exist.
- **Priority:** P1

## 5. P2 — Optimizations

- Standardize product-card badge hierarchy: max one commercial badge + one lifecycle badge.
- Use two-column mobile product grid by default for fashion unless imagery/text density warrants one column.
- Clamp mobile product title to 2 lines; price must never truncate.
- Keep wishlist target at least ~44×44 CSS px even if icon is visually smaller.
- Provide mobile sort/filter sticky affordance after the PLP header only when useful; avoid permanent vertical-space tax.
- Add visible applied-filter chips and one-tap clear.
- Use category-specific size filters so irrelevant shoe sizes/clothing sizes are not mixed without context.
- Reduce repeated campaign sections if they delay product discovery.
- Keep newsletter signup below core merchandising/trust content.

## 6. P3 — Experiments / Polish

- Test “Shop Best Sellers” vs lifestyle hero CTA for social-ad traffic.
- Test quick-add on PLP versus product-detail-first behavior for fashion products with required size selection.
- Test one consolidated “Best price” offer module versus multiple offer rows.
- Test recently viewed for returning visitors.
- Test photo-review prominence on PDP after core purchase decision elements.

## 7. Mobile Homepage

### Strengths

- Multiple paths to category and product discovery.
- Best sellers and new arrivals support merchandising.
- Promotional and editorial modules can support fashion storytelling.

### Problems

- Campaign density risks pushing products downward on mobile.
- Physical-store messaging is not universally white-label-safe.
- Currency/identity inconsistencies currently damage trust.
- Too many merchandising blocks can turn the page into a long campaign feed rather than a shopping funnel.

### Required mobile architecture

1. Announcement (optional)
2. Compact header with logo/search/cart/menu
3. Hero or primary campaign
4. Fast category discovery
5. Best sellers / primary product grid
6. One supporting campaign
7. New arrivals / personalized merchandising
8. Trust/editorial/reviews
9. Newsletter
10. Footer

Do not place multiple full-height editorial campaigns before the first meaningful product grid.

## 8. Mobile Navigation & Search

**NOT VERIFIED interactively.**

Required standard:

- Search accessible within one tap from primary header.
- Cart accessible within one tap and shows quantity badge.
- Menu must not cover close/back control.
- Mobile drawer should preserve scroll and close predictably.
- Search should support autocomplete, recent queries, typo tolerance, product/category suggestions and useful no-result state.
- If bottom navigation is adopted, it must not conflict with sticky Add to Cart.

## 9. Mobile PLP / Collection

Observed structure includes category, price, size and color filters plus sorting and product cards.

### Key issues

- Category-filter URL and visible title are not aligned.
- Filter taxonomy mixes clothing sizes and numeric sizes in one global list; category-aware filters are preferable.
- Color choices can become long on mobile; use compact swatches/labels with progressive disclosure.

### Recommended behavior

- Header: category name + product count.
- Sticky compact row: Filter | Sort.
- Applied filters appear as removable chips.
- Filter drawer/bottom sheet shows result count on Apply.
- Clear All stays visible when filters are active.
- Preserve filters on PDP back navigation.

## 10. Mobile PDP

### Current capability observed

- Product media
- Product title/price
- Stock state
- Short description
- Offers
- Size selector/size guide when relevant
- Colour
- Pincode availability
- Add to Bag / View Bag
- Trust statements
- Detail/care/delivery tabs
- Recommendations
- Reviews and customer photos
- Sticky/secondary purchase representation appears in page source but exact sticky behavior is NOT VERIFIED

### High-impact improvements

- Move ratings/review count near title/price.
- Present savings as an outcome, not several competing coupon cards.
- Show delivery estimate, shipping fee/free shipping and COD availability as soon as pincode is known.
- Replace generic “No Returns” trust tile with precise policy language and reason when product is non-returnable.
- Ensure size selection is mandatory when required and Add to Bag communicates the missing selection inline.
- Product attributes must be product-specific.

## 11. Variant & Purchase Interaction

**Interactive behavior NOT VERIFIED.**

Required standard:

- Selected variant has strong visual state plus accessible state.
- Disabled/out-of-stock variant cannot be added.
- If Add to Bag is tapped without required variant, scroll/focus to selector and explain what is missing.
- Variant changes update image, stock, price and delivery data when applicable.
- Do not auto-select a size unless merchant explicitly chooses that strategy and it cannot cause accidental wrong-size orders.

## 12. Offers & Discounts

### Current observations

- Global code: `WELOCOM10` for 10%.
- PDP bank offer: HDFC10.
- PDP first-order code: WELCOME15.

### Required hierarchy

1. **Primary saving:** product-level discount / best automatically applicable offer.
2. **Secondary saving:** first-order/coupon benefit.
3. **Payment benefit:** bank/prepaid benefit.
4. **Other offers:** collapsed.

The platform should calculate and display the best eligible price wherever possible instead of forcing manual mental arithmetic.

## 13. Trust & Delivery

### Positive signals

- Pincode availability field.
- Secure payment methods.
- Contact/support surfaces.
- Reviews/customer photos.
- Returns/shipping policies.

### Trust risks

- Store identity inconsistency.
- Placeholder return address.
- Demo/mismatched product content.
- “No Returns” without contextual explanation can feel punitive.
- Mixed physical location information.

### Recommendation

Treat trust as accurate operational information, not badge quantity. Prioritize delivery date, return eligibility, COD/payment, real reviews and support.

## 14. Sticky Add to Cart

**Exact sticky behavior NOT VERIFIED.**

Required Woxly standard:

- Appear when original purchase CTA is leaving/has left viewport.
- Height target roughly 56–72 px plus safe area, not a large card.
- Show price + selected variant summary when space allows.
- CTA changes to “Select size” state if required variant missing.
- Hide/adjust when keyboard, cart drawer or checkout overlays are active.
- Never cover accordions, cookie controls, chat widgets or browser safe area.

## 15. Cart

**NOT VERIFIED.**

Required audit/implementation standard:

- Clear product image/title/variant/quantity.
- Immediate quantity updates with loading protection.
- Remove with undo where feasible.
- Primary checkout CTA visually dominant.
- Coupon and prepaid saving should not compete with checkout.
- Shipping/free-shipping progress may be used only if threshold is real and configured.
- Upsell should remain below core order summary and must not trap checkout.

## 16. Checkout

**NOT VERIFIED.**

Required Woxly mobile standard:

- Guest-first checkout.
- Phone keyboard for phone fields; numeric keyboard for pincode/OTP.
- Autofill and address assistance where supported.
- Preserve values after validation errors.
- Inline errors next to fields.
- Final order total visible near payment CTA.
- COD/prepaid eligibility explained before final action.
- Avoid unnecessary account creation.
- Keyboard must never cover the active field or final CTA without scroll recovery.

## 17. Product Cards

### Required standard

- Image ratio consistent within a collection.
- 2-line title maximum on mobile.
- Price is always visible; compare-at/saving secondary.
- Max two badges.
- Wishlist target ≥ ~44×44 CSS px.
- Quick add only when purchase does not require an ambiguous variant; otherwise use “Choose options.”
- No hardcoded currency symbols.
- Loading/skeleton preserves image aspect ratio to reduce CLS.

## 18. Typography

Exact rendered sizes are **NOT VERIFIED**.

Recommended system targets:

- Mobile body: generally 14–16 px depending on typeface.
- Critical price/product information should not rely on tiny helper text.
- Minimum legal/support text should remain comfortably readable under browser text scaling.
- Headings must use clear hierarchy without consuming excessive vertical space.
- Avoid all-caps for long promotional sentences.

## 19. Spacing & Alignment

Exact pixel QA is **NOT VERIFIED**.

Use a consistent 4/8 px spacing system. Recommended starting points:

- Page side padding: ~16 px mobile.
- Section gap: ~32–48 px depending on importance.
- Card internal gaps: ~8–12 px.
- CTA height: ~48–52 px.
- Variant chips: touch area ~44 px minimum even if visual chip appears smaller.

Classify whitespace as intentional or dead space. Remove dead vertical space that delays products, price, variants, delivery or CTA.

## 20. Micro-interactions

- **Add to Bag:** immediate pressed/loading state; prevent duplicate taps; confirm success.
- **Variant:** selected state updates instantly; unavailable state clearly disabled.
- **Pincode:** loading indicator → serviceable/not serviceable + delivery estimate.
- **Coupon:** applied state shows actual saving in rupees.
- **Cart quantity:** optimistic or immediate feedback, with safe rollback on error.
- **Gallery:** swipe + page indicator; no decorative animation required.
- **Filter:** selected count updates; Apply communicates result count.

## 21. Content / Microcopy

### System content

- Use “Add to Bag” consistently if that is theme vocabulary; do not mix “Cart” and “Bag” unpredictably.
- Replace generic trust claims with operationally accurate language.
- Fix or verify `WELOCOM10` spelling.
- Do not hardcode “Woxly Club” into a white-label merchant theme unless merchant-configurable.

### Merchant guardrails

- Hero heading: recommended max ~45 characters on mobile.
- Hero supporting copy: ~90 characters.
- Promo badge: ~18 characters.
- Category name: handle at least ~24 characters gracefully.
- Product title: render safely beyond 60+ characters; clamp cards, not PDP.
- Offer description: wrap and collapse rather than overflow.

## 22. White-label Requirements

1. All brand/store names are merchant data.
2. Currency is store configuration.
3. Location/store-locator modules are conditional.
4. Support email/phone/address are configurable.
5. Copyright label is configurable.
6. Policy names/addresses are store data.
7. Offer codes are merchant/admin data.
8. Homepage campaigns are merchant-configurable.
9. Trust claims must be enabled only when operationally true.
10. Theme must handle missing reviews, missing images, no discounts, no variants, 10+ variants, long titles and long category names.

## 23. Accessibility

Exact visual contrast/focus behavior is **NOT VERIFIED**.

Required:

- WCAG AA contrast for body/critical interactive text where feasible.
- Visible keyboard focus.
- Buttons and icon controls have accessible names.
- Color swatches include text/ARIA names and selected state not conveyed by color alone.
- Form inputs have persistent labels, not placeholder-only identification.
- Error text announced programmatically.
- Product gallery images include meaningful alt text.
- Respect reduced-motion preference.
- Support 200% text zoom without horizontal clipping.

## 24. Performance

Measured LCP/CLS/INP were **NOT VERIFIED**.

Risks to test:

- Multiple large homepage campaign images.
- Large product galleries.
- Third-party reviews/analytics/chat scripts.
- Webfonts.
- Carousels and animation libraries.
- Unreserved image space causing CLS.

Required baseline:

- Responsive image sizes and modern formats.
- Lazy-load below-fold imagery.
- Preload only genuinely critical hero/PDP media.
- Reserve aspect ratios.
- Defer non-critical scripts.
- Keep promotional animation CSS/lightweight.

## 25. Bugs

### BUG ID: MOB-GLOBAL-001
- **Page:** Homepage/PDP
- **Device / viewport:** Mobile reference 390×844; data inconsistency is viewport-independent
- **Severity:** CRITICAL
- **Current behavior:** Homepage merchandise displays `$` pricing while PDP displays `₹`.
- **Expected behavior:** One store currency is used consistently across all surfaces.
- **Steps to reproduce:** Open homepage → inspect “New At WOXLY” prices → open a product PDP → compare currency.
- **Conversion / user impact:** High trust loss; uncertainty about actual charge currency.
- **Evidence:** Live homepage + PDP.
- **Recommended fix:** Centralize currency formatter and remove hardcoded symbols.
- **Status:** OPEN

### BUG ID: MOB-GLOBAL-002
- **Page:** Global footer/policies/contact
- **Device / viewport:** All
- **Severity:** CRITICAL
- **Current behavior:** Store presents mixed Woxly, Mini Mart, grocery/supermarket and fashion identities.
- **Expected behavior:** One merchant identity across storefront and policies.
- **Steps to reproduce:** Open homepage/PDP → footer → returns/shipping/contact.
- **Conversion / user impact:** Buyer may suspect fake or unfinished store.
- **Evidence:** Live footer and policy pages.
- **Recommended fix:** Merchant identity data contract + publish validation.
- **Status:** OPEN

### BUG ID: MOB-POLICY-003
- **Page:** Returns
- **Device / viewport:** All
- **Severity:** CRITICAL
- **Current behavior:** Return address shows `[INSERT RETURN ADDRESS]`.
- **Expected behavior:** Valid merchant return address or deliberately omitted section.
- **Steps to reproduce:** Open Returns & Refunds.
- **Conversion / user impact:** Strong trust/legal readiness failure before purchase.
- **Recommended fix:** Required config + placeholder scanner before publish.
- **Status:** OPEN

### BUG ID: MOB-OFFER-004
- **Page:** Global/PDP
- **Device / viewport:** All
- **Severity:** MAJOR
- **Current behavior:** Announcement promotes `WELOCOM10` while PDP promotes `WELCOME15`; validity of both is NOT VERIFIED.
- **Expected behavior:** Offer names/codes and eligibility are internally consistent and validated.
- **Steps to reproduce:** Open homepage/PDP and compare promotions.
- **Conversion / user impact:** Coupon confusion, failed-code risk and checkout abandonment.
- **Recommended fix:** Central offer service; validate active code before rendering.
- **Status:** OPEN / CODE VALIDITY NOT VERIFIED

### BUG ID: MOB-PLP-005
- **Page:** PLP
- **Device / viewport:** All
- **Severity:** MAJOR
- **Current behavior:** URL with `category=women` presents heading “All Products.”
- **Expected behavior:** Visible collection title and applied category state reflect the chosen category.
- **Steps to reproduce:** Open `/products?category=women`.
- **Conversion / user impact:** Shopper cannot confirm filter/navigation worked.
- **Recommended fix:** Bind heading/breadcrumb/filter chip to active category query/state.
- **Status:** OPEN

### BUG ID: MOB-PDP-006
- **Page:** Linen Cushion Cover PDP
- **Device / viewport:** All
- **Severity:** CRITICAL
- **Current behavior:** Material and review content appears mismatched to a cushion-cover product; review copy references wearing/hemming.
- **Expected behavior:** Attributes/reviews belong to the current product.
- **Steps to reproduce:** Open Linen Cushion Cover PDP → read details/reviews.
- **Conversion / user impact:** Makes reviews/product data appear fabricated.
- **Recommended fix:** Product-ID data binding; prohibit reusable hardcoded demo review payloads.
- **Status:** OPEN

### BUG ID: MOB-POLICY-007
- **Page:** Shipping
- **Device / viewport:** All
- **Severity:** MAJOR
- **Current behavior:** Shipping policy identifies Mini Mart and contains mixed address/location data inconsistent with fashion storefront positioning.
- **Expected behavior:** Merchant-specific legal/support data only.
- **Steps to reproduce:** Open Shipping & Delivery.
- **Conversion / user impact:** Trust and support uncertainty.
- **Recommended fix:** Central merchant profile + policy template tokens.
- **Status:** OPEN

## 26. Admin Dependencies

**STOREFRONT + ADMIN** requirements:

- Store name/legal name/logo.
- Currency.
- Support email/phone/address.
- Return address.
- Physical store locations + enable/disable store locator.
- Announcement text/code/start-end dates.
- First-order offer/bank/prepaid offers.
- Homepage section ordering/toggles.
- Trust statements.
- Product badges.
- Reviews moderation/source.
- Recommendation section toggles.
- Free-shipping threshold.

Admin publish validation should block obvious placeholder tokens and warn on missing policy/support fields.

## 27. Analytics Requirements

Track at minimum:

- `view_home`
- `view_collection`
- `select_category`
- `apply_filter`
- `sort_products`
- `search_open`
- `search_submit`
- `view_item`
- `select_variant`
- `size_guide_open`
- `check_pincode`
- `offer_expand`
- `add_to_cart`
- `view_cart`
- `begin_checkout`
- `apply_coupon`
- `select_payment_method`
- `purchase`
- `review_expand`
- `recommendation_click`

Include product ID, variant ID, collection, traffic source, device class, store/theme ID, experiment ID and failure reason where relevant.

## 28. Recommended A/B Tests

1. **Hero-first vs product-first:** editorial hero followed by categories versus compact hero + immediate best sellers.
2. **Offer module:** multiple visible offer cards versus one “Best offer” + expandable details.
3. **Sticky CTA content:** CTA only versus price + selected size + CTA.
4. **PLP quick add:** “Choose options” flow versus direct quick-add for one-variant products.
5. **Trust placement:** delivery/returns immediately under CTA versus compact trust row plus expandable details.

Do not run experiments until P0 data/trust defects are resolved.

## 29. Acceptance Criteria

Theme-wide acceptance criteria:

1. No demo brand/data leaks into a configured merchant storefront.
2. Currency is consistent end-to-end.
3. Product data/reviews map only to the active product.
4. Policy pages have no placeholders.
5. Category state is visible and accurate.
6. Mobile width 360–430 px has no horizontal overflow.
7. Critical touch targets are approximately 44×44 CSS px or equivalent accessible target area.
8. Sticky purchase UI does not cover content or safe areas.
9. Required variants cannot be bypassed.
10. Cart totals and checkout totals match.
11. Checkout forms recover from validation errors without losing data.
12. Text zoom and keyboard states remain usable.

## 30. Implementation Checklist

- [ ] Centralize merchant identity model.
- [ ] Centralize currency formatting.
- [ ] Remove hardcoded demo brand/store strings.
- [ ] Add placeholder-token publish validation.
- [ ] Audit all product-detail field bindings.
- [ ] Audit review-to-product mapping.
- [ ] Fix category heading/filter state.
- [ ] Consolidate offer data source.
- [ ] Define global mobile header/announcement height rules.
- [ ] Define product-card mobile standard.
- [ ] Define PDP information order.
- [ ] Define sticky Add to Bag standard.
- [ ] Add admin toggles for physical-store modules.
- [ ] Add analytics events.
- [ ] Run responsive QA at 360/375/390/412/430 widths.
- [ ] Run Android Chrome + iOS Safari QA.

## 31. QA Checklist

### Global
- [ ] Correct logo/store name on every page.
- [ ] Correct currency everywhere.
- [ ] No placeholder text.
- [ ] No horizontal overflow.
- [ ] Footer/legal/support content consistent.

### Homepage
- [ ] Announcement code valid.
- [ ] Hero CTA destination correct.
- [ ] Campaign sections do not block first product discovery excessively.
- [ ] Product-card prices/badges accurate.

### PLP
- [ ] Category title matches active category.
- [ ] Filters apply/remove correctly.
- [ ] Sort applies correctly.
- [ ] Back navigation preserves state.
- [ ] Empty state useful.

### PDP
- [ ] Images load/swipe/zoom correctly.
- [ ] Product title/price/details match selected product.
- [ ] Reviews belong to selected product.
- [ ] Required variant enforcement works.
- [ ] Price/stock/media update on variant change.
- [ ] Pincode success/error states work.
- [ ] Add to Bag cannot duplicate accidentally.
- [ ] Sticky CTA matches current variant/price.

### Cart
- [ ] Correct variant added.
- [ ] Quantity updates once per tap.
- [ ] Remove works.
- [ ] Totals/coupon/shipping recalculate correctly.

### Checkout
- [ ] Phone/pincode/OTP keyboard types correct.
- [ ] Validation messages visible.
- [ ] Keyboard does not trap CTA.
- [ ] COD/prepaid eligibility accurate.
- [ ] Payment success/failure/retry works.
- [ ] Back navigation preserves safe state.

## 32. Re-review Checklist

For V2 implementation review mark every V1 issue as:

- FIXED
- PARTIALLY FIXED
- NOT FIXED
- REGRESSION
- NEW ISSUE

Re-test in this order:

1. 390×844 mobile homepage first viewport.
2. Category/PLP filters and sort.
3. Fashion PDP with size/color variants.
4. PDP after scroll + sticky Add to Bag.
5. Add to Bag → cart.
6. Coupon and quantity updates.
7. Checkout form/keyboard/validation.
8. COD/prepaid/payment states.
9. Order success.
10. 360/375/412/430 responsive stress test.
11. Desktop comparison.
12. White-label stress test with long names, bright/light colors, long product titles, multiple discounts and missing reviews.

---

## Cross-theme Classification

### A. Woxly Global Mobile Commerce Standard
- Currency formatter
- Merchant identity contract
- Product data integrity
- Mobile header/announcement constraints
- PLP filter/sort behavior
- PDP sequencing
- Sticky Add to Cart behavior
- Cart/checkout interaction standards
- Accessibility targets
- Analytics taxonomy

### B. Theme-Specific Pattern
- Fashion editorial campaign density
- Lookbook presentation
- Fashion-focused category imagery
- Size-guide presentation

### C. Merchant-Configurable Feature
- Store locator
- Homepage campaign modules
- Announcement/offer copy
- Trust badges/claims
- Homepage section order
- Product recommendations

### D. CRO Experiment
- Hero versus product-first hierarchy
- Offer disclosure model
- Sticky CTA content
- Quick-add behavior

### E. Admin Requirement
- Store/legal identity
- Currency
- Policy/contact data
- Offer configuration
- Physical store enable/disable
- Trust content
- Recommendation controls
- Analytics configuration
