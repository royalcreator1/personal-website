# Deployment check failure — 2026-11-02

## Observed failure

The [GitHub Actions run for commit bf5bd5b](https://github.com/royalcreator1/personal-website/actions/runs/41404553679) installed dependencies and built the application successfully. Its **Setup Pages** step then failed with `HttpError: Not Found` and the annotation:

> Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions.

Artifact upload and Pages deployment were skipped. Node.js action-runtime deprecation notices were warnings, not the cause of the failure.

## Root cause

The repository retained an obsolete GitHub Pages deployment workflow, while production is hosted through the existing Vercel GitHub integration. GitHub Pages was not enabled, so the workflow failed while requesting its site configuration.

There was also a downstream configuration mismatch: the workflow expected `./out`, but this application uses standard Next.js server output in `.next`. Changing to static export would remove the runtime required by the contact API and the default image optimizer, so enabling Pages alone would not be a complete fix.

The same commit had successful Vercel deployment statuses. The live domain returned Vercel response headers and contained the latest grounded Systems artwork, approved Experience wording, Bangalore location, and PNG favicon. The failed Pages check did not represent the active production deployment.

## Fix

- Replace `.github/workflows/deploy.yml` with `.github/workflows/ci.yml`, clearly named **Portfolio CI**.
- Run locked dependency installation, navigation checks, Blog source-integrity checks, and the standard production build on main pushes and pull requests.
- Remove unused Pages publishing steps and Pages/OIDC write permissions.
- Use Node.js 24 and Node.js 24-compatible checkout/setup actions.
- Preserve Vercel deployment, the Next.js runtime, contact API, image optimization, and the current UI.
- Correct the README's obsolete static-export and hosting instructions.

## Verification

Verify the fix against its exact commit using both the GitHub Actions result and Vercel deployment status. Check the live home page, Blog routes, student-life page, project detail routes, and local image assets. Contact verification should use a rejected invalid request only; no real message needs to be sent.

The original website remains preserved in `backup/main-before-redesign-2026-11-02`.
