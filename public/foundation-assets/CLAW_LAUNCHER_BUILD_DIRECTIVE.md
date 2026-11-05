# CLAW LAUNCHER | NLC LAYING THE FOUNDATION FOR SUCCESS EXPERIENCE
## Production-site implementation handoff | Version 16 design and copy

**Authority:** Founder-established working wording and approved visual structure in `NLC_Sales_Page_V16_Copyright_Footer.html`. This is the latest source for site **content and design**, not a working backend implementation. Do not substitute prior versions. Preserve the founder's established copy verbatim unless directed to correct an actual spelling/technical error. Do not undertake a new editorial rewrite.

**Objective:** Finish the working Laying the Foundation for Success Experience Sales/Registration Page in the existing NLC application, insert the approved artwork, connect the already-built registration flow, verify the existing integrations and produce a reviewable production-ready staging page. After founder approval, deploy the approved version to production. The working V16 HTML is not itself production-ready: its form JavaScript explicitly prevents submission and displays a preview-only message. **Replace that preview-only handler with the application's existing tested registration integration.**

## A. Existing system: preserve, do not rebuild

- Use the existing NLC Lead CRM app / existing Vercel and GitHub deployment workflow.
- Continue from the `foundation-experience-staging` work and the already-tested VIP/Skooly/WebinarJam qualification sequence. Do not overwrite functioning integrations with the preview-only HTML handler.
- Existing webhook / route: `/api/webhooks/skooly`.
- Existing lead-capture API: `/api/capture-lead` (verify its currently deployed contract and error handling).
- Existing Masterclass event: **Cash Flow Injection Strategy Masterclass**, **Thursday November 19, 2026 at 11:00 AM EST**. WebinarJam handles confirmation and reminder emails. WebinarJam is not named on the public Sales Page.
- Global Control is a **backup member database only**, not an email or automation system. Nothing about the Sales Page implementation requires Global Control messaging work.
- Do not invent other software or middleware.

## B. What to implement now

1. **Sales Page:** Use the HTML file in this package as the current Version 16 copy, sections, progression data, colors, layout and CTA reference. Implement the corresponding page in the existing Next.js/Vercel project rather than publishing the preview HTML as-is.
2. **Approved images:** Integrate the ORIGINAL approved artwork. See `APPROVED_IMAGE_MANIFEST.md`. The three NLC artwork originals are referenced in the HTML but **their binary files are not supplied in this package**; source them from the pre-existing NLC presentation/project assets or the corresponding approved asset directory already available in your environment. The supplied Simulator artwork is embedded in the HTML and is also supplied separately. No generic stock imagery or unapproved replacement.
3. **Remove obsolete image wording:** The original approved cover, gathering and foundation images were created when the offer had the working phrase **“Exclusive Foundation Bundle Experience”** embedded in the pictures. The current official offer name is **“Laying the Foundation for Success Experience.”** Do not display an image with obsolete “Bundle” text on the live site. Preserve the approved artwork aesthetic, people, colors and borders; carefully crop/mask the obsolete text region and show accurate HTML typography if necessary. If source-image correction is unavailable, identify that one artwork blocker in your staging report. Do not silently publish incorrect image wording.
4. **Correct 8-week visuals:** In the Network Effect section display only **three distinct progressions**: eight weekly Connection counts, Citizen monthly Residual Cash Flow and Enterprise monthly Residual Cash Flow. All figures are already correctly present in V16. Do not add an extra progression starting with 1. Do not use activation payments as the projected Cash Flow; do not recalculate any figures.
5. **Registration:** First Name, Last Name and Email required; Mobile optional. Capture the lead into the NLC Lead CRM with attribution, normalize and deduplicate email, handle existing users without blocking their ability to proceed, display form errors accurately. Successful capture leads into SKOOL Community / Classroom access according to existing-user status. Verify real SKOOL URLs in the admin/configuration, do not invent a URL.
6. **SKOOL purchase:** $97 **One-Time** course purchase for the SKOOL Classroom **“NLC | Laying the Foundation for Success.”** SKOOL executes payment and Classroom access. The public Sales Page merely captures a lead and directs them onward; no false purchase confirmation on the registration page.
7. **Manual verification:** After a real purchase, founder checks the SKOOL course purchase and manually assigns VIP status. Existing Skooly VIP tier-change webhook is the founder-controlled confirmation signal. NLC CRM identifies both **Foundation for Success Experience Participant** and **Official Cash Flow Visionary**, plus Masterclass eligibility. The separate $297/year VIP offering is not being sold or built for this Experience. Foundation Classroom access remains separate from evergreen Premium content. Do not build a course-purchase API integration.
8. **Masterclass:** Verified Experience purchasers **OR** eligible evergreen Premium members qualify. Retain the already-tested automation and the existing WebinarJam emails. Preserve one registration per event/person and do not disturb Premium members.
9. **Public copy guardrails:** No disclosure of the private solution engine by name, no recurring internal fees and no Founders Beta details in this public Sales Page. Retain existing educational Cash Flow example disclosures. Public site must not promise earnings.
10. **Footer:** Keep **`© 2026 NETWORK LEVERAGING CASH FLOW | CASH FLOW VISIONARIES`**, with © at the beginning.

## C. Approved numerical data: locked

| Week | Connections | Citizen Residual / month | Enterprise Residual / month |
|---|---:|---:|---:|
| 1 | 3 | $32 | $149 |
| 2 | 9 | $38 | $173 |
| 3 | 27 | $71 | $328 |
| 4 | 81 | $172 | $793 |
| 5 | 243 | $476 | $2,191 |
| 6 | 729 | $1,388 | $6,383 |
| 7 | 2,187 | $2,754 | $12,670 |
| 8 | 6,561 | $6,855 | $31,533 |

These are **monthly Residual Cash Flow illustrations at each weekly milestone**, based on the canonical NLC private presentations. Not weekly payouts, guaranteed income or typical results. Preserve the existing disclosure; keep explanatory labeling accurate. **Never change these numbers without founder direction.**

## D. Site QA and deployment gate

- Confirm the V16 copy and paragraph order are preserved; no editorial rewrites.
- Confirm full actual artwork resolves; no missing image icon, empty frame or visibly obsolete “Bundle” label.
- Confirm the eight-week Connection, Citizen and Enterprise panels match the locked table.
- Test 320, 390, 768, 1024 and 1440-pixel widths; ensure responsive design, readable type, no overlap/cutoff, good contrast and usable form controls.
- Verify lead capture to **NLC Lead CRM** on staging, UTM attribution and duplicate email behavior.
- Verify free Community join versus returning member flows, and SKOOL Buy Now Classroom destination. Do not make an unauthorized real purchase.
- Verify existing VIP → Skooly → both CRM statuses → Masterclass qualification remains functional without unnecessarily rerunning a previously successful paid-workflow test.
- Keep separate **staging** and **production** states. Do not silently replace or publish the final public Sales Page before the founder sees and approves the staged finished site with actual artwork.

## E. Deliverables / progress report back to founder

Produce a clickable staging URL showing the full Version 16 site with completed imagery, the real registration form and all three data visuals. Supply a short PASS/FAIL checklist for imagery, exact copy, mobile, CRM form submission, SKOOL redirect and preserved Masterclass eligibility. Identify only **actual** outstanding blockers, not hypothetical integration redesigns. After founder signs off, deploy the approved page to production and return the live URL.

**Do not ask founder to rework any already-approved page copy. Focus on implementation and completion.**
