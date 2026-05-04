# Fluent Gang Business Model Direction

Fluent Gang should support consumer and company learning from the beginning, even if monetization is implemented after the MVP learning loop is stable.

## Planned Tiers

### Free

- Access to the core vocabulary and lesson flow.
- A 15-second ad appears before launching a generated lesson.
- During MVP testing, the ad gate is mocked as 2 seconds so iteration stays fast.
- Ads should not interrupt reading, quizzes, shadowing, focus sessions, or reviews.
- The ad experience should feel controlled and predictable, not aggressive.

### Paid

- Ad-free learning.
- Premium feeling should be visible through flow quality, calm UI, and convenience rather than pressure.
- Future paid features may include richer AI lesson modes, advanced progress insights, pronunciation feedback, generated audio voices, and expanded review controls.

### Company

- B2B plan for companies that want language learning for employees.
- Future features may include organization accounts, seats, teams, admin dashboard, progress reports, target-language programs, and company-specific vocabulary packs.
- The product should remain mobile-first for learners while leaving room for future web dashboards for admins.

## Product Principles

- Free users should still feel respected.
- Ads should happen at a predictable moment: before lesson generation/start.
- Paid upgrade should feel like removing friction, not escaping punishment.
- Company features should build on the same learner experience, not fork the product too early.

## Architecture Notes

Future tables or modules may include:

- `plans`
- `subscriptions`
- `organizations`
- `organization_members`
- `company_learning_programs`
- `ad_impressions`
- `entitlements`

Do not implement these before they are needed. Keep the MVP focused on the learning loop.
