# Copilot Instructions

- This repository currently contains only a single file: `testlej.txt`.
- There are no source directories, build scripts, package manifests, or README files present.
- Before making code changes, ask the user to clarify the intended language, framework, and application goal.

- If a task references implementation details, first verify whether additional project files are missing or expected to be added.
- Do not assume an existing build/test workflow; there is no evidence of `.github/workflows`, `package.json`, `pyproject.toml`, `build.gradle`, or similar files.

- For any new code, keep the first iteration small and ask for feedback.
- If you add a new project structure, document it clearly in the response and avoid making broad architectural changes without confirmation.

- When updating files, preserve existing content unless the user explicitly asks to refactor or remove it.
- Use the repository root and `testlej.txt` as the only confirmed existing project artifact.

- If asked to scaffold new functionality, request the following before proceeding:
  1. Target language or runtime
  2. Desired behavior or feature
  3. Whether a build/test workflow should be included

- Do not invent external integrations or dependencies that are not present in the repository.
- If the user later provides additional files, update this guidance to describe the new architecture and conventions.