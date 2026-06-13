/**
 * Mock data conventions for RealGemsStore.
 *
 * Rules:
 * 1. All mock datasets live in src/mock/ — never hardcode in UI components.
 * 2. Use realistic IDs (e.g. prod_001, gem_001) matching future MongoDB ObjectId patterns.
 * 3. Include createdAt/updatedAt ISO strings on entities that will be persisted.
 * 4. Use INR currency and Indian market pricing for realism.
 * 5. Image URLs should use approved remote hosts (see next.config.ts).
 * 6. Services import from mock/ — UI imports from services/ only.
 * 7. When backend is ready, delete mock imports from services and swap to fetch().
 */

export {};
