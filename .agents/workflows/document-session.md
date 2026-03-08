---
description: Document the current coding session
---

This workflow helps you document recent code changes into the DEVELOPMENT_LOG.md file, or generate commit messages based on git diffs.

1. Check the current git status to identify modified, added, or deleted files:
   // turbo

```bash
git status
```

2. View the git diff for uncommitted changes to understand the context of the work:
   // turbo

```bash
git diff
git diff --cached
```

3. **Analyze Changes**:
   Analyze the diffs and file changes to determine the key accomplishments, technical decisions, and features implemented in this session.

4. **Update Development Log**:
   Append a new timestamped entry to `DEVELOPMENT_LOG.md` summarizing the session. The entry should include:
   - Date and time of the session.
   - High-level summary of the goal.
   - Bullet points of specific technical changes or rationale.
   - List of key files modified.

5. **Review & Commit (Optional)**:
   If the user wants to commit these changes, suggest a conventional commit message based on the summary.
