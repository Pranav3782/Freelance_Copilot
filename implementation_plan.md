# Implementation Plan

## Goal
- Ensure the Google Sign‑In button works correctly on the new **AuthPage**.
- Improve the fit‑score block in **AnalysisResultsView** so the layout is nicely spaced and a loading placeholder (skeleton) appears while the analysis data is being fetched.

## User Review Required
> [!IMPORTANT]
> The proposed changes modify two core components (`AuthPage` and `AnalysisResultsView`). Please confirm that:
> 1. Switching back to `signInWithPopup` (with persistence) is acceptable.
> 2. Adding a loading skeleton to the fit‑score section meets the visual expectations.

## Open Questions
> [!QUESTION]
> - Do you want the loading skeleton to mimic the existing `ScoreRing` design (circular placeholder) or a simple gray box?
> - Should the Google sign‑in button display a spinner while the popup is opening (already present) – any additional UI tweaks?

## Proposed Changes
---
### AuthPage (src/components/AuthPage.tsx)
- Import `setPersistence` and `browserLocalPersistence` from `firebase/auth`.
- Update `handleGoogleSignIn` to set persistence, call `signInWithPopup`, and wrap the profile‑write in a try/catch.
- Add robust error handling that ignores user‑cancelled pop‑ups.
- Minor UI polish: keep the existing loading spinner text.

### AnalysisResultsView (src/components/AnalysisResultsView.tsx)
- Change the component signature to accept `analysis?: ProjectAnalysis` and `isLoading?: boolean`.
- When `isLoading` true (or `!analysis`), render a skeleton placeholder for the **Fit Score** block:
  - Use a gray circular placeholder matching the `ScoreRing` size.
  - Add CSS animation (`animate-pulse`) for a premium feel.
- Adjust the surrounding grid layout margins/paddings to give more breathing room around the score block.
- When data is ready, render the original content.
- Update all callers (`App.tsx` and any other component) to pass `isLoading` based on the analysis fetch state.

## Verification Plan
- Run the app locally (`npm run dev`).
- Click **Continue with Google** – verify the popup appears, authentication succeeds, and navigation proceeds.
- Open a project analysis page; while the analysis request is pending, confirm the skeleton appears and transitions smoothly to the real score.
- Ensure no console errors, and the UI respects the design aesthetic (premium colors, spacing, micro‑animations).

### Automated Tests
- None provided; manual UI checks will suffice.

### Manual Verification
- Verify Google sign‑in works on Chrome/Edge.
- Verify the fit‑score block displays correctly on desktop and mobile.
- Verify the loading placeholder animates and matches the design language.
