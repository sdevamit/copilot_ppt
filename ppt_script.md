# GitHub Copilot: Augmented Engineering

## Complete Presentation Script with Demo Instructions

---

## Slide 1: Title Slide (Index.html)

**Slide Content:**

- Title: "Augmented Engineering: Mastering GitHub Copilot"
- Subtitle: "AI as your pair programmer: accelerate delivery & raise quality"
- Topics covered: Modes, Prompting, Copilot Edits, Security & Enterprise
- Audience: Software Engineers & Engineering Managers
- 18 slides total

**Speaker Notes:**

- Welcome the audience
- Introduce yourself and your role
- Brief overview: "Today we're exploring GitHub Copilot — an AI coding assistant that's transforming how developers write code."
- Mention the presentation covers: what it is, the three interaction modes, effective prompting, security, and enterprise tiers
- Live demos are woven throughout

**Demo Project Setup (do this before the talk starts):**

```bash
# Open the demo project in a second VS Code window
code /Users/amitkumar/work/taskflow
```

All live demos use **TaskFlow** — a minimal task management app (Node.js/Express/TypeScript API + React/TypeScript UI). The audience will see the same codebase evolve across every demo, creating a coherent narrative instead of isolated code snippets.

**Time: 2 minutes**

---

## Slide 2: What is GitHub Copilot? (1.html)

**Slide Content:**

- **Context-Aware Engine** — Powered by multiple AI models (availability varies by plan/org config). Analyzes active files, cursor position, open tabs, and workspace context to infer intent.
- **Dynamic Learning** — Synthesizes signals from local project structure and coding patterns to generate idiomatic suggestions.
- **Multi-Modal Interaction** — Ghost Text, Chat, Inline Edits, and Copilot Edits (multi-file agent) — choose the right mode for every task.
- **Strategic Goal** — Reduces the "toil" of boilerplate so you can focus on design and complex logic.
- Input signals diagram: Active File → Workspace → Open Tabs → Git History → Cursor Pos → Reasoning Engine → Suggestion

**Speaker Notes:**

- Copilot is an AI-powered code completion tool built by GitHub
- Uses multiple AI models — availability varies by plan and org configuration
- Acts like a "pair programmer" — suggests code, explains concepts, fixes bugs
- Works inside your IDE (VS Code, JetBrains, Neovim, etc.)

**Key Points to Emphasize:**

- "It's not just autocomplete — it reads your whole workspace context"
- "Copilot augments *your* creativity, not replaces it"
- "You're always in control — review, accept, or reject suggestions"

**Time: 3 minutes**

---

## Slide 3: Workflow Integration: The Daily Coding Loop (17.html)

**Slide Content:**
Iterative development cycle with 6 steps:

1. **Plan** (Human) — Define intent, scope & break down task
2. **Write Intent** (Human) — Write comments, types, or test stubs
3. **Suggest** (AI Assistant) — Copilot proposes code, logic & boilerplate
4. **Verify** (Human) — Review diffs, run tests, check security
5. **Refine** (Mixed) — Use Chat/Inline to tweak & optimise
6. **Commit** (Human) — Finalise changes & merge PR

The cycle then iterates.

**Speaker Notes:**

- This is a realistic workflow integrating Copilot into your daily development
- The human is always in the loop — AI assists at Suggest and Refine steps only
- Key principle: write your intent first (comments, types, test stubs), then let Copilot fill in the implementation

**Talking Points:**

- "Notice the loop: you plan and write intent, Copilot suggests, you verify and refine, then commit"
- "This keeps you in control. The AI never commits — you do"
- "The Verify step is non-negotiable — always review diffs before accepting"

**Time: 2 minutes**

---

## Slide 4: Deep Dive: Copilot Modes in VS Code (4.html)

**Slide Content:**
Three interaction models:

1. **Ghost Text (Autocomplete)** — Real-time, context-aware code completions as you type. Predicts the next few lines. Accept with `Tab`. Best for boilerplate, repetitive patterns & idiomatic scaffolds.
2. **Copilot Chat (Ask | Plan | Agent)** — Unified chat panel with three built-in modes. Ask answers questions, Plan breaks work into steps, Agent autonomously implements. Open with `Ctrl+Cmd+I` (Mac) / `Ctrl+Alt+I` (Windows). Best for architecture, Q&A, planning, and multi-file agentic tasks.
3. **Inline Chat (In-Editor Edit)** — Targeted code generation and refactoring directly within your active file. Describe the change, see the diff. Trigger with `Cmd+I` (Mac) / `Ctrl+I` (Windows). Best for refactoring, documenting & localized code generation.

**Speaker Notes:**

- Copilot has **3 core interaction modes** in VS Code
- Each mode has a different workflow and use case — we'll demo each one
- Ghost Text is "always on"; Chat and Inline are triggered explicitly

**Talking Point:** "Think of these as three gears: Ghost Text for speed, Inline Chat for precision, Copilot Chat for thinking and planning."

**Time: 2 minutes**

---

## Slide 5: Mode 1: Ghost Text (Autocomplete) (5.html)

**Slide Content:**

- **Best Use Cases:** Boilerplate, repetitive patterns, and idiomatic scaffolds
- **Seeding Suggestions:** Guide the AI with descriptive function names, types, and comments
- **Controls:** Accept: `Tab` | Cycle: `Option+]` (Mac) / `Alt+]` (Windows) | Partial: `Cmd+→` (Mac) / `Ctrl+→` (Windows)
- **Guardrails:** Keep functions small. Verify correctness and side effects.
- Code example: `taskApi.ts` — `getTaskById` function that fetches a task from the TaskFlow API

**Speaker Notes:**

- Ghost Text is "always on" — real-time suggestions appear greyed-out as you type
- **Accept**: `Tab` — **Cycle alternatives**: `Option+]` (Mac) / `Alt+]` (Windows) — **Accept word-by-word**: `Cmd+→` (Mac) / `Ctrl+→` (Windows)
- The TypeScript example shows Copilot completing a typed async `getTaskById` function from just the comment and signature — including `fetch`, 404 handling, and JSON parsing

**Live Demo Instructions:**

### Demo 1a: Function Signature → Full Implementation

**File:** `client/src/api/taskApi.ts` (already open in the TaskFlow project)

**Step 1:** Scroll to the bottom of the file. The existing functions show Copilot the pattern. Add:

```typescript
// Fetches a single task by ID from the TaskFlow API. Returns null if not found.
async function getTaskById(id: string): Promise<Task | null> {
```

**Step 2:** Press Enter after the opening brace and pause 1 second.

**Expected:** Copilot Ghost Text suggests:

```typescript
  const response = await fetch(`${API_BASE}/tasks/${id}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch task: ${response.statusText}`);
  }
  return response.json();
}
```

**Step 3:** Press `Tab` to accept.

**Talking Point:** "The comment is doing the heavy lifting — and notice Copilot inferred the `Task | null` return type, the 404 guard, and the error message format by reading the other functions already in the file. Context is everything."

---

### Demo 1b: Cycle Through Alternatives

**Step 1:** Trigger a suggestion and press `Option+]` (Mac) / `Alt+]` (Windows) to cycle through alternatives.

**Talking Point:** "Copilot often has multiple suggestions — cycle through them before accepting."

---

### Demo 1c: Partial Accept

**Step 1:** When a suggestion appears, press `Cmd+→` (Mac) / `Ctrl+→` (Windows) to accept word-by-word.

**Talking Point:** "You don't have to accept the whole suggestion. Take just what you need."

**Time: 5–7 minutes (including setup)**

---

## Slide 6: Mode 2: Inline Chat (11.html)

**Slide Content:**

- **Targeted Refactoring** — Select specific blocks of code and request explicit transformations
- **Explicit Constraints** — Add constraints like "optimize for perf" or "use functional style"
- **Diff & Review** — Always review the diff view before accepting changes to ensure safety
- **Iterative Refinement** — Chain prompts to tighten code quality step-by-step
- Code example: `taskService.ts` — `fetchTaskData` callback-based function with prompt "Refactor to async/await and add TypeScript return type Promise\<Task | null\>"

**Speaker Notes:**

- **What it is**: Edit code without opening the chat panel
- **Shortcut**: Select code → `Cmd+I` (Mac) / `Ctrl+I` (Windows/Linux)
- **Use cases**: Refactoring, adding types, error handling, documentation
- **Workflow**: Select code → Type instruction → Review diff → Accept or reject

**Live Demo Instructions:**

### Demo 2a: Modernise a Callback Function

**File:** `server/src/services/taskService.ts` (open in TaskFlow project)

**Step 1:** Scroll to `fetchTaskData` — this is the callback-style function at the top of the file:

```typescript
function fetchTaskData(id: string, callback: (err: Error | null, task: Task | null) => void): void {
  const url = 'http://localhost:3000/api/tasks/' + id;
  const xhr = new (require('xmlhttprequest').XMLHttpRequest)();
  xhr.open('GET', url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        callback(null, data);
      } else {
        callback(new Error('Failed to fetch task: ' + xhr.status), null);
      }
    }
  };
  xhr.send();
}
```

**Step 2:** Select the entire `fetchTaskData` function

**Step 3:** Press `Cmd+I` (Mac) / `Ctrl+I` (Windows)

**Step 4:** Type:

```
Refactor to async/await using the native fetch API and add TypeScript return type Promise<Task | null>
```

**Expected:** Function rewritten as:

```typescript
async function fetchTaskData(id: string): Promise<Task | null> {
  const response = await fetch('http://localhost:3000/api/tasks/' + id);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch task: ${response.statusText}`);
  }
  return response.json();
}
```

**Step 5:** Review the diff → Click "Accept"

**Talking Point:** "Inline Chat shows you exactly what changed before you commit. The diff makes the contract clear: same behaviour, modern style, typed return. Always review before accepting."

---

### Demo 2b: Add Error Handling with Constraints (Optional)

**Step 1:** Select a simple function

**Step 2:** Press `Cmd+I` (Mac) / `Ctrl+I` (Windows)

**Step 3:** Type:

```
Add try-catch error handling, use functional style, return null on error
```

**Talking Point:** "The more constraints you give, the more targeted the suggestion."

**Time: 6–8 minutes**

---

## Slide 7: Mode 3: Copilot Chat (6.html)

**Slide Content:**
One panel, three built-in modes — open with `Ctrl+Cmd+I` (Mac) / `Ctrl+Alt+I` (Windows):

- **Ask** — Conversational Q&A with full codebase context. Discuss trade-offs, debug issues, explore APIs — multi-turn.
- **Plan** — Returns a step-by-step implementation plan without touching code. Review it before Copilot acts.
- **Agent** — Copilot plans and implements a full feature end-to-end: edits files, runs terminal commands, fixes errors.
- **@-Mention Participants** — Extend context with `@workspace`, `@vscode`, `@terminal`, `@github` — works in all 3 sub-modes.

Code example: Multi-turn conversation about optimising `updateMultipleTaskStatuses` in `taskService.ts` — sequential `for...of await` loop → Copilot suggests `Promise.all` → then asking about partial failure handling using a PostgreSQL transaction.

**Speaker Notes:**

- Copilot Chat is a **single panel with three modes**: Ask, Plan, Agent
- This is the most powerful mode for complex reasoning and multi-file work
- The demo conversation shows multi-turn: first optimise latency, then handle failures — Copilot retains context across turns

**Live Demo Instructions:**

### Demo 3a: Multi-Turn Debugging / Optimisation

**File:** `server/src/services/taskService.ts` (same file as Inline Chat demo — audience recognises it)

**Step 1:** Open Copilot Chat (`Ctrl+Cmd+I` Mac / `Ctrl+Alt+I` Windows), leave `taskService.ts` open in the editor

**Step 2:** Type:

```
I'm seeing high latency in updateMultipleTaskStatuses. How can I optimize it?
```

**Expected:** Copilot reads the open file, spots the sequential `for...of await` loop, and suggests replacing it with `Promise.all(ids.map(...))`.

**Step 3:** Follow up:

```
Good catch. But what if one update fails? I don't want partial status changes.
```

**Expected:** Copilot suggests wrapping the `Promise.all` in a PostgreSQL transaction using `pool.connect()` + `client.query('BEGIN')` / `COMMIT` / `ROLLBACK`.

**Step 4:** Follow up:

```
Show me the final version with both the Promise.all and the transaction
```

**Talking Point:** "Three turns, one coherent thread. Copilot held the context — it knew we were talking about `updateMultipleTaskStatuses` in TaskFlow's service layer, not some abstract function. That's what makes multi-turn powerful."

---

### Demo 3b: Generate Unit Tests

**Step 1:** Select a function, then in Chat type:

```
/tests Generate comprehensive unit tests for this function using Jest
```

**Talking Point:** "Copilot scaffolds your test suite. You review and tweak, but the boilerplate is gone."

**Time: 8–10 minutes**

---

## Slide 8: Copilot Chat: Ask Mode (7.html)

**Slide Content:**

- **Interactive Discussions** — Don't just code — discuss trade-offs. Ask "What are the pros/cons of X vs Y?"
- **Debugging Assistant** — Paste stack traces or error logs. Ask for root causes and verification steps.
- **Context is King** — Reference specific files in your prompt to ground the AI's reasoning.
- **Pro Tip:** Use `@workspace` to ask questions about the entire project structure.

Code example: Conversation about `server/src/middleware/auth.ts` — comparing **short-lived JWTs with refresh tokens** vs **sliding sessions**, with Copilot recommending short-lived JWTs for a stateless task API and providing a `validateToken` implementation that rejects expired tokens and returns `401`.

**Speaker Notes:**

- Ask Mode is conversational Q&A — use it for architecture decisions, debugging, API exploration
- Run this demo **after** the Agent Mode demo — by then `auth.ts` will have a real implementation to discuss
- Always reference actual files (`#file:auth.ts`) to ground the AI in your real code

**Live Demo Instructions (if time permits):**

### Demo: Architecture Discussion on auth.ts

**Step 1:** Open Chat (`Ctrl+Cmd+I` Mac / `Ctrl+Alt+I` Windows) and type:

```
#file:server/src/middleware/auth.ts
Our token expires in 1 hour. Should I add refresh tokens or use sliding sessions? Which fits better for a stateless API?
```

**Expected:** Copilot compares both approaches in the context of a stateless Express API, recommends short-lived JWTs + refresh tokens, and sketches a `POST /auth/refresh` endpoint.

**Talking Point:** "Ask Mode is your rubber duck that talks back — and has read your code. Notice I referenced the real file with `#file:`. The answer is grounded in our actual implementation, not a generic tutorial."

**Time: 3–4 minutes**

---

## Slide 9: Copilot Chat: Agent Mode (9.html)

**Slide Content:**

- **Autonomous Planning & Implementation** — Give a high-level goal. Copilot creates a plan and executes each step: creates files, edits code, wires dependencies.
- **Terminal Command Execution** — Runs build, install, test, and migration commands in the integrated terminal. Reads output and self-corrects on errors.
- **Review at Every Step** — Every file edit is shown as a reviewable diff. Interrupt, undo, or redirect Copilot mid-task at any checkpoint.
- **Tool & MCP Invocations** — Agent can invoke MCP tools (search, fetch, database) and VS Code extensions to gather context beyond the codebase.

Code example: User asks "Complete the `verifyToken` stub in `server/src/middleware/auth.ts`, protect all `/api/tasks` routes, and write Jest tests." Copilot runs `npm install jsonwebtoken @types/jsonwebtoken`, implements `verifyToken` with `jwt.verify`, updates `routes/tasks.ts` to apply the middleware on every route, then writes Jest tests for valid token, expired token, and missing header cases — showing the diff of the updated `auth.ts`.

**Speaker Notes:**

- Agent Mode is selected inside Copilot Chat — look for the "Agent" tab/toggle
- It is **autonomous** — Copilot will run terminal commands and edit multiple files
- You can interrupt at any checkpoint — every change is shown as a diff first
- Point out that `auth.ts` and `routes/tasks.ts` are in the TaskFlow project the audience already recognises

**Live Demo Instructions (if time permits):**

### Demo: Complete JWT Auth in TaskFlow

**Setup:** Open `server/src/middleware/auth.ts` in the editor so the audience can see the empty stub.

**Step 1:** Switch to Agent mode in Copilot Chat

**Step 2:** Type:

```
Complete the verifyToken stub in server/src/middleware/auth.ts:
- Use jsonwebtoken to verify a Bearer token from the Authorization header
- Attach the decoded payload to req.user
- Return 401 for missing or invalid tokens
Then wire verifyToken onto every route in server/src/routes/tasks.ts.
Finally, write Jest tests covering: valid token, expired token, missing header.
```

**Expected:**

1. Copilot runs `npm install jsonwebtoken @types/jsonwebtoken`
2. Implements `JwtPayload` interface and full `verifyToken` in `auth.ts`
3. Updates every `router.get/post/put/delete` in `routes/tasks.ts` to include `verifyToken`
4. Creates `auth.test.ts` with 3 test cases

**Step 3:** Review each diff before accepting.

**Talking Point:** "Notice it touched three files — `auth.ts`, `routes/tasks.ts`, and a new test file — in one pass. And it ran `npm install` on its own. That's the Agent contract: you describe the outcome, it figures out the steps. You review every change."

**Time: 3–4 minutes**

---

## Slide 10: Copilot Chat: Plan (Break Down Work) (10.html)

**Slide Content:**

- **Structural Decomposition** — Best for ambiguous tasks. Ask Copilot to break down large features into sequential, implementable steps with clear owners.
- **What to Ask For** — Request artifacts: migration checklists, dependency graphs, test strategies, rollback plans, and API schema changes.
- **Example Prompt** — "Plan: Add cursor-based pagination to GET /users. Constraints: Postgres, <200ms p95. Produce steps, schema changes & rollout plan."
- **Strategic Outcome** — Turns "unknowns" into a concrete roadmap. Use the output to generate PR descriptions or ticket requirements.

Code example: `PLAN.md` output with three pending steps: (1) Database Migration — add index on `(created_at, id)` in the `tasks` table, (2) API Update — update `GET /api/tasks` in `routes/tasks.ts`, validate cursor tokens, (3) Testing Strategy — unit boundary checks + load test to verify p95 < 200ms. Plus a suggestion to add a feature flag.

**Speaker Notes:**

- Plan mode does **not** edit any files — it produces a plan for you to review first
- Use it before Agent mode for complex tasks: Plan to verify the approach, then Agent to execute
- The output can be directly used as a PR description or Jira ticket breakdown

**Live Demo Instructions (if time permits):**

### Demo: Plan Pagination for TaskFlow

**Setup:** Open `server/src/routes/tasks.ts` so the audience can see the current `GET /api/tasks` route (no pagination).

**Step 1:** In Chat (Plan sub-mode), type:

```
Plan: Add cursor-based pagination to GET /api/tasks in TaskFlow.
Constraints: PostgreSQL, cursor on (created_at, id), <200ms p95, no OFFSET.
Produce steps, required schema changes in the tasks table, code changes, rollout plan.
```

**Expected:** Copilot produces a structured breakdown:

- DB Migration: add composite index on `(created_at, id)`
- API Update: add `cursor` and `limit` query params to `routes/tasks.ts`, update `taskService.getAllTasks()` to accept cursor
- Testing Strategy: unit test boundary conditions, load test to verify p95 < 200ms
- Rollout: feature flag `pagination_enabled`, deploy behind flag, validate, remove flag

**Talking Point:** "Plan mode turned an ambiguous requirement into a concrete, reviewable roadmap — and it hasn't touched a single file in TaskFlow yet. Use this output as your PR description or Jira ticket before switching to Agent mode to execute."

**Time: 2–3 minutes**

---

## Slide 11: Copilot Chat: Participants (@-Mentions) (8.html)

**Slide Content:**

**Agents (@ prefix):**

- `@workspace` — Searches your workspace using retrieval to surface relevant files, symbols, and structure. Context is retrieved — not the entire repo loaded at once.
- `@vscode` — Answers questions about VS Code settings, commands, extensions, and keyboard shortcuts.
- `@terminal` — Generates shell commands based on your current terminal context and OS.
- `@github` — Optional; availability depends on enabled integrations. Provides GitHub-aware Q&A (issues, PRs, repos).

**Chat Variables (# prefix):**

- `#file` — Attach a specific file to your question for targeted analysis.
- `#selection` — Automatically includes the current editor selection as context.
- `#codebase` — Tells Copilot to search the full codebase for relevant context.
- `#terminalSelection` — Passes the currently selected terminal output as context.

**Pro Tip:** Use `@workspace` to ask questions about the entire project structure.

**Speaker Notes:**

- **Participants** are the `@` agents within Copilot Chat — they scope context to different sources
- **Chat Variables** (`#`) are a separate mechanism to attach specific context to your prompt
- These work in Ask, Plan, AND Agent modes

**Talking Points:**

- "`@workspace` is for repo-level questions; `@terminal` is for shell help; `@github` connects to issues and PRs"
- "Combine them: `@workspace /fix #file:server/src/mappers/taskMapper.ts` — Copilot searches the whole TaskFlow codebase for context, then applies a targeted fix to just `taskMapper.ts`"
- "The difference between `@workspace` and `#codebase`: `@workspace` is an agent, `#codebase` is a variable you attach to any prompt"

**Time: 2 minutes**

---

## Slide 12: Quick Reference: Agents & Slash Commands (13.html)

**Slide Content:**

**Built-in Agents (@ prefix):**

| Agent | Scope |
|-------|-------|
| `@workspace` | Retrieval over workspace files, symbols, and structure |
| `@vscode` | VS Code settings, commands, and extensions |
| `@terminal` | Shell commands based on OS & terminal context |
| `@github` | GitHub issues, PRs, repos (availability depends on integrations) |

**Chat Variables (# prefix):**

| Variable | Purpose |
|----------|---------|
| `#file` | Attach a specific file as context |
| `#selection` | Include current editor selection |
| `#codebase` | Search full codebase for relevant context |
| `#terminalSelection` | Pass selected terminal output as context |

**Slash Commands (/ prefix):**

| Command | Purpose | Notes |
|---------|---------|-------|
| `/explain` | Walk through selected code step-by-step | Great for legacy code |
| `/fix` | Identify and resolve bugs or compile issues | |
| `/tests` | Generate unit tests matching your framework | |
| `/doc` | Add JSDoc, docstrings, or inline comments | |
| `/optimize` | Suggest performance improvements | May vary by version |
| `/new` | Scaffold a new project, file, or component | May vary by version |
| `/newNotebook` | Create a Jupyter notebook from a prompt | May vary by version |
| `/setupTests` | Configure a test framework (Jest, Pytest, Vitest…) | May vary by version |
| `/search` | Natural-language workspace search via `@workspace` | May vary by version |
| `/clear` | Start a fresh chat session | |

**Pro Tip:** Combine agents, variables, and slash commands:
`@workspace /fix #file:server/src/mappers/taskMapper.ts` — searches the whole TaskFlow codebase for context, then applies a targeted fix to `taskMapper.ts` only.

Use `Tab` to autocomplete agents and slash commands in the chat input box.

**Speaker Notes:**

- This slide is a cheat sheet — encourage the audience to screenshot it
- Highlight the combination example as the most powerful pattern

**Time: 2 minutes**

---

## Slide 13: The Art of Effective Prompting (14.html)

**Slide Content:**
Section divider slide — "Moving from 'Code Generation' to 'Intent Engineering'"

Three teaser concepts:

- **Context is King**
- **Single Responsibility**
- **Iterative Refinement**

**Speaker Notes:**

- This section shifts from *what* Copilot can do to *how* to get the best out of it
- Prompting is a skill — "Intent Engineering" is a better mental model than "code generation"
- The next two slides drill into the principles and concrete examples

**Talking Point:** "The best Copilot users aren't thinking 'write this function for me.' They're thinking 'here is my intent, my constraints, and my verification criteria.' That's Intent Engineering."

**Time: 1 minute**

---

## Slide 14: Prompt Engineering Principles (15.html)

**Slide Content:**
Five principles with an "Anatomy of a Perfect Prompt" example:

1. **Context is King** — Keep relevant files open (interfaces, utils) to ground the AI in your codebase's reality.
2. **Single Responsibility** — One prompt, one goal. Ask for specific outcomes (e.g., "generate interface") rather than broad tasks to avoid hallucinations.
3. **Explicit Constraints** — Define the boundaries: "Use functional style", "No external libraries", "O(n) complexity", "Follow Google Style Guide".
4. **Acceptance Criteria** — Tell Copilot how you'll verify success: "Include unit tests for edge cases", "Generate DocBlock comments".
5. **Iterative Refinement** — Treat the first output as a draft. Review, then refine: "Now optimize for memory" or "Handle the null case".

**Anatomy of a Perfect Prompt:**

```
// 1. Context
Reference: @workspace #file:server/src/models/task.ts
Focus: createTask function in taskService.ts

// 2. Goal
Create a validation function for new task creation.

// 3. Constraints
- Use Zod library for schema.
- title: required, max 100 chars.
- status: must be 'pending' | 'in-progress' | 'done', default 'pending'.
- No external validation libraries other than Zod.

// 4. Criteria
Provide 3 unit tests covering:
- Valid input
- Title too long (101 chars)
- Invalid status value
```

**Speaker Notes:**

- Walk through each principle, then show the anatomy example as the synthesis
- Emphasise that you don't need all 4 parts every time — but the more you provide, the better the output

**Live Demo Instructions:**

### Demo: Build a Prompt Live

**Step 1:** Open Chat and type a bad prompt:

```
write a validation function
```

**Step 2:** Improve it step by step, adding each element (context, constraint, criteria). Reference the actual TaskFlow `Task` model each time and show how the output improves.

**Talking Point:** "Invest 20 seconds composing a good prompt. Save 10 minutes of rework. The `#file:task.ts` reference alone doubles the quality — Copilot now knows the exact shape of the object it's validating."

**Time: 4–5 minutes**

---

## Slide 15: Bad vs. Good Prompts (16.html)

**Slide Content:**
Three real examples — each showing an ineffective prompt and an effective rewrite:

**Example 1 — Refactoring:**

- ❌ Ineffective: `"Refactor this file"` — Too broad, no goal
- ✅ Effective (Inline Chat, with `taskService.ts` selected): `Refactor updateMultipleTaskStatuses to run queries concurrently with Promise.all instead of sequential await. Keep the function signature identical. Ensure all updates still use parameterized queries.`

**Example 2 — Test Generation:**

- ❌ Ineffective: `"Write tests"` — No scope or framework
- ✅ Effective (`@workspace`): `Generate unit tests for mapRowToTask() in taskMapper.ts covering: valid row, null status (should default to 'pending'), null assignee_id. Use Jest, mock the TaskRow input, no DB connection needed.`

**Example 3 — Bug Fix:**

- ❌ Ineffective: `"Fix this error"` — Lacks context
- ✅ Effective (`/fix`): `TypeError in taskMapper.ts line 22: handle null task.status by returning default 'pending'. Include diff and add one regression test for the null status case.`

**Speaker Notes:**

- Use these three examples as the live demo — type each bad prompt first, observe the generic output, then type the improved version
- All examples reference real TaskFlow files the audience has seen — `taskService.ts`, `taskMapper.ts`
- The pattern is always: **add specificity** — goal, constraints, acceptance criteria

**Live Demo Instructions:**

### Demo: Bad → Good Prompt (3 examples)

**Setup:** Open `server/src/mappers/taskMapper.ts` in the editor so the audience recognises the file.

**Step 1:** For each example, type the ineffective prompt first. Observe the vague output.

**Step 2:** Re-prompt with the effective version. Compare outputs.

**Talking Point for Example 1:** "'Refactor this file' means nothing to the model. What is the function? What's the concurrency target? What mustn't change? Spell it all out."

**Talking Point for Example 2:** "'Write tests' — Copilot doesn't know your framework, the edge cases you care about, or whether to mock DB access. Spell it out. `mapRowToTask` is a pure function — no DB needed, and that's important to say."

**Talking Point for Example 3:** "Always include the file name, the line, the specific `TypeError`, and what 'fixed' looks like. The diff and regression test request are gold — they make the fix verifiable."

**Time: 5–6 minutes**

---

## Slide 16: Context Rot — Keeping Your Chat Healthy (27.html)

**Slide Content:**

**What is Context Rot?**
The degradation in Copilot response quality that occurs when a chat session accumulates stale history, failed attempts, pasted error dumps, or mixed unrelated topics — filling the context window with noise rather than signal.

**DOs:**

- ✅ **Start fresh with `/clear` per task** — One task, one session. Use `/clear` before switching topics to reset the context window entirely.
- ✅ **Use `#file` and `#selection` references** — Reference files by path instead of pasting code into chat. Saves token budget and keeps context targeted.
- ✅ **Prefer scoped context over `@workspace`** — For targeted edits, use `#file:path` instead of broad workspace retrieval to maintain high signal-to-noise ratio.

**DON'Ts:**

- ❌ **Mix unrelated topics** — Cross-topic sessions split the model's attention and produce hallucinations that blend both subjects.
- ❌ **Keep re-prompting a stuck session** — After 2–3 failed attempts at the same goal, accumulated error turns make things worse. `/clear` and restart.
- ❌ **Paste the same code block repeatedly** — Duplicate tokens consume the context budget without adding value. Use `#file` once instead.

**Visual:** Context window health gauge showing turns going from "Focused task prompt" (green) → "Pasted 200-line error log" (amber) → "Switched to unrelated topic" (amber) → "Model mixing context from turns 1 & 6" (red). Token bar at 87% consumed.

**Speaker Notes:**

- Context rot is the silent performance killer for Copilot Chat power users
- The model doesn't flag when its context is degraded — responses just quietly get worse
- The fix is always the same: `/clear`, restate your goal cleanly, use file references

**Talking Points:**

- "Ever noticed Copilot giving you increasingly generic answers mid-session? Or referencing something you mentioned 10 turns ago incorrectly? That's context rot."
- "The context window is a shared resource. Pasting a 200-line stack trace, switching topics, then re-prompting means the model is now reasoning over all of that at once."
- "The fix is free and instant: `/clear`. Think of it as a lint tool for your chat session."
- "Use `#file:path` instead of pasting code — the model sees the same content, but you preserve context budget for the actual conversation."

**Live Demo Instructions:**

### Demo: Show Context Rot in Action

**Step 1:** Start a Copilot Chat session with `server/src/services/taskService.ts` open. Ask a focused question:

```
Refactor updateMultipleTaskStatuses in taskService.ts to use Promise.all
```

**Expected:** Clean, specific response with a clear before/after diff.

**Step 2:** Without clearing, paste a long unrelated error log, then ask:

```
Now also fix this error: [paste 50 lines of unrelated TypeScript compiler output from the client build]
```

**Step 3:** Now ask the original question again — notice the response quality drop or context confusion (Copilot may reference client build paths or mix concerns).

**Step 4:** Run `/clear`. Restate only the original goal with a `#file` reference:

```
Refactor updateMultipleTaskStatuses to use Promise.all. #file:server/src/services/taskService.ts
```

**Expected:** Clean, precise response with no noise from the previous turns.

**Talking Point:** "Same question, two inputs: a polluted context and a fresh one. The difference in output quality is immediate and obvious. The fix is free and instant — type `/clear` and restart."

**Time: 3 minutes**

---

## Slide 17: Security, Privacy & Responsible Use (18.html)

**Slide Content:**

**DOs:**

- ✅ **Review for Vulnerabilities** — Scan for SQL injection, XSS, insecure deserialization, and weak cryptography. Use SAST tools as a second check.
- ✅ **Use Content Exclusions** — Configure `.copilotignore` to exclude sensitive files (secrets, internal schemas) from Copilot context.

**DON'Ts:**

- ❌ **Don't Paste Secrets** — Never include API keys, passwords, tokens, or PII in prompts or in code sent to Copilot. Use environment variables instead.
- ❌ **Don't Ignore License Flags** — Copilot can detect suggestions matching public code. Review flagged suggestions for license compatibility (MIT, GPL, etc.) before using.

**Data Privacy Facts:**

- Code is **NOT used to train models** — With Copilot for Business/Enterprise, snippets are not retained or used for training by GitHub.
- **Prompts sent to GitHub's servers** — Code context is sent over TLS-encrypted connections.
- **Enterprise: Org-level policies** — Admins can restrict which repos and file patterns Copilot can read.
- **Duplication detection filter** — Copilot can optionally filter out suggestions that match verbatim blocks of public code.
- **No output guarantee** — Suggestions may contain security anti-patterns. Run SAST (CodeQL, Snyk) on all AI-generated code as part of CI.

Reference: GitHub's Privacy Statement and Copilot Trust Center.

**Speaker Notes:**

- "Copilot suggestions are probabilistic, not authoritative. You are the last line of defense."
- Emphasise the `.copilotignore` — set it up before your first session on a new repo
- The duplication detection filter is opt-in — worth enabling for compliance-sensitive codebases

**Live Demo (Optional):**

### Demo: Ask Copilot to Review Its Own Suggestion

**File:** `server/src/db/index.ts` (open in the TaskFlow project)

**Step 1:** Scroll to the `searchTasks` function — this is already in the TaskFlow codebase:

```typescript
export async function searchTasks(query: string) {
  const sql = `SELECT * FROM tasks WHERE title LIKE '%${query}%'`;
  return pool.query(sql);
}
```

**Step 2:** Select the function, then in Chat type:

```
What's wrong with this code from a security perspective? How would you fix it?
```

**Expected:** Copilot identifies the template literal SQL injection vulnerability in `query`, explains the attack vector (a malicious `query` value like `%'; DROP TABLE tasks; --`), and suggests:

```typescript
export async function searchTasks(query: string) {
  return pool.query(
    'SELECT * FROM tasks WHERE title ILIKE $1',
    [`%${query}%`]
  );
}
```

**Talking Point:** "This vulnerability is already in the TaskFlow codebase we've been working on all session. Use Copilot to review Copilot's output — it's self-aware enough to catch its own security mistakes. This is why you never skip the review step."

**Time: 3–4 minutes**

---

## Slide 18: Copilot Enterprise: Beyond Individual Productivity (19.html)

**Slide Content:**
Three-tier comparison:

**Copilot Individual** — For individual developers

- Ghost Text autocomplete
- Copilot Chat (sidebar)
- Inline Chat & Copilot Edits
- All slash commands & agents
- Model choice (available models vary by plan & org config)
- ✗ Organization knowledge bases
- ✗ Admin policy controls
- ✗ Audit logs & compliance
- **Starting at $10/month** (or free for OSS)

**Copilot Business** — For teams & orgs

- Everything in Individual
- No code retention for training
- Admin policy management
- Content exclusions (`.copilotignore`)
- Audit logs for usage
- IP indemnification
- ✗ Custom knowledge bases
- ✗ Org knowledge bases (repo indexing)
- **Starting at $19/user/month**

**Copilot Enterprise** — For large organizations

- Everything in Business
- ⭐ Org Knowledge Bases
- ⭐ Private repo indexing for Knowledge Bases
- ⭐ Copilot for Pull Requests
- ⭐ Docset indexing & Q&A
- SAML/SCIM SSO integration
- Advanced audit & compliance
- **Key Differentiator:** Knowledge Bases let Copilot answer questions using your internal wikis, runbooks, and architecture docs — grounded in your org's context.
- **Starting at $39/user/month**

**Speaker Notes:**

- The main differentiators going from Individual → Business: data privacy controls (no retention, audit logs, IP indemnification)
- The main differentiator for Enterprise: **Knowledge Bases** — Copilot can answer questions grounded in your own internal docs
- Model choice is available across tiers but availability varies by plan and org configuration

**Talking Point:** "Enterprise isn't just about more features — it's about privacy, compliance, and making Copilot organisation-aware. If you work on proprietary code at scale, Knowledge Bases are the killer feature."

**Time: 2 minutes**

---

---

## Slide 19: Advanced Copilot Customization — Section Divider (21.html)

**Slide Content:**
Section divider — "Advanced Copilot Customization"

Five teaser concepts:

- **Custom Agents** — `@yourAgent` scoped AI workflows
- **Custom Instructions** — Always-on context for every chat
- **Prompt Files** — Reusable, versioned prompt templates
- **Skills** — Give Copilot Agent custom capabilities
- **Hooks** — React to Copilot lifecycle events

**Speaker Notes:**

- This section shifts from using Copilot out of the box to *extending and personalizing* it
- These features let teams encode organizational knowledge and workflow into Copilot itself
- They're the difference between a generic AI assistant and one that "knows" your codebase, standards, and tools

**Talking Point:** "Everything so far has been how to *use* Copilot. This section is about how to *shape* it for your team."

**Time: 1 minute**

---

## Slide 20: Custom Agents — Chat Participants (22.html)

**Slide Content:**

- **Declarative: `.github/agents/*.agent.md`** — Drop a Markdown file with YAML frontmatter (`name`, `description`, `tools`, `model`) in `.github/agents/`. VS Code 1.106+ auto-discovers it as a named agent — no extension code needed.
- **Programmatic: Extension API** — Use `vscode.chat.createChatParticipant(id, handler)` when you need full control: custom system prompt, streaming responses, slash commands, or external API calls.
- **Handoffs & Subagents** — Declare `handoffs:` in the agent frontmatter to hand off to other specialized agents mid-conversation. Use `agents: ['*']` to allow any registered agent as a subagent.
- Code example: `.github/agents/db-expert.agent.md` — YAML frontmatter with `name`, `description`, `tools`, `model: gpt-4o`, and `handoffs:` list; with a compact Extension API fallback snippet for programmatic cases.

**Speaker Notes:**

- Declarative `.agent.md` files are the recommended path for VS Code 1.106+; no TypeScript, no extension packaging
- Place the file in `.github/agents/` — Copilot picks it up automatically; it's version-controlled and reviewable like any config
- Use the Extension API when you need full logic: custom LLM calls, streaming, or integration with any VS Code API
- `handoffs:` enables multi-agent chaining — the DB agent can hand off to a migration agent after schema analysis

**Live Demo Instructions:**

### Demo: Create a Declarative `@db-expert` Agent for TaskFlow

**Step 1:** Create `.github/agents/db-expert.agent.md`:

```markdown
---
name: db-expert
description: Answers questions about the TaskFlow database schema, runs queries, and generates migrations.
tools:
  - codebase
  - runCommand
model: gpt-4o
handoffs:
  - migration-agent
---
You are a PostgreSQL expert for the TaskFlow application.
Always use parameterized queries. Never expose raw SQL strings with user input.
Reference the schema in `server/src/db/schema.sql` for context.
```

**Step 2:** Open Copilot Chat — the `@db-expert` agent is now available (no reload needed).

**Step 3:** Invoke:

```
@db-expert List all tables and their primary keys in the TaskFlow database
```

**Step 4:** Demonstrate a handoff:

```
@db-expert Generate a migration to add a `priority` column to the tasks table
```

Copilot responds and optionally hands off to `@migration-agent` for the actual file creation.

**Talking Point:** "No `npm install`, no `vsce package`, no extension manifest — just a Markdown file checked into the repo. Every team member gets this agent the moment they pull the branch."

**Key Points to Emphasize:**

- "`.agent.md` is the new, preferred way — file in repo, no extension code needed (VS Code 1.106+)"
- "Frontmatter `tools:` controls exactly what the agent can do — `runCommand`, `codebase`, `editFiles`, etc."
- "`handoffs:` turns single agents into multi-agent pipelines without extra plumbing"
- "For full programmatic control — streaming, external APIs, custom LLM calls — the Extension API is still available"

**Time: 4–5 minutes**

---

## Slide 21: Custom Instructions (23.html)

**Slide Content:**

- **Repo-Level: `.github/copilot-instructions.md`** — Automatically injected into every Copilot Chat session for that repository. Use `/init` in Chat to auto-generate a starter file from your existing codebase context.
- **File-Based: `*.instructions.md`** — Create scoped instruction files (e.g., `tests.instructions.md`) with `applyTo: "**/*.test.ts"` frontmatter. Rules activate only for matching files — no noise on unrelated requests.
- **User Settings: `settings.json`** — Set `github.copilot.chat.codeGeneration.instructions` for personal rules that apply across all repos and workspaces without checking in any file.
- Code example: `.github/copilot-instructions.md` for repo-wide rules + `tests.instructions.md` showing `applyTo:` frontmatter scoping test conventions; `/init` flow bootstrap.

**Speaker Notes:**

- Repo-level instructions are still the highest-ROI entry point — one file, applied to every prompt, zero team friction
- File-based `*.instructions.md` with `applyTo:` is the new addition: scope rules to specific file patterns so they're not always injected. Test standards, API design rules, migration conventions — each gets its own file
- `/init` in Copilot Chat bootstraps a starter `copilot-instructions.md` by analyzing your repo — a great 30-second setup
- User settings are for personal preferences (preferred comment style, etc.) that shouldn't be forced on the whole team

**Live Demo Instructions:**

### Demo: Bootstrap Instructions and Add Scoped File Rules

**Step 1:** Open Copilot Chat and run:

```
/init
```

Copilot analyzes the TaskFlow repo and generates a starter `.github/copilot-instructions.md`.

**Step 2:** Review and refine the generated file, then add project-specific rules:

```markdown
# TaskFlow Coding Standards

## Tech Stack
- Runtime: Node.js 20 LTS
- Framework: Express 5 + TypeScript 5.4
- Database: PostgreSQL 16 via `pg` (node-postgres)
- Testing: Jest + ts-jest

## Code Style
- Use async/await, never raw .then()/.catch()
- All DB queries must use parameterized placeholders ($1, $2)
- All exported functions must have JSDoc comments
```

**Step 3:** Create a scoped file `.github/tests.instructions.md` for test-specific rules:

```markdown
---
applyTo: "**/*.test.ts"
---
# Test Standards

- Every test file must have a `describe` block matching the module name
- Use `beforeEach` to reset state — never share mutable state between tests
- Mock all database calls using `jest.spyOn` — no real DB connections in unit tests
- Test names must follow: `should <action> when <condition>`
```

**Step 4:** Ask Copilot to add a test for `taskService.ts` — observe that the scoped rules are applied only when working in a `*.test.ts` file.

**Talking Point:** "Two files. One always-on for repo conventions, one scoped for test rules. Copilot now writes tests the way your team wants — every time — without anyone remembering to ask."

**Key Points to Emphasize:**

- "`/init` generates the starting point in seconds — don't write from scratch"
- "`applyTo:` scoping means rules for tests don't leak into production code suggestions"
- "The repo-level file is version-controlled — treat changes as code review like any PR"
- "User settings are for personal preferences that shouldn't affect the whole team"

**Time: 3–4 minutes**

---

## Slide 22: Prompt Files (24.html)

**Slide Content:**

- **Location: `.github/prompts/*.prompt.md`** — Markdown files that define reusable prompts, stored in your repo alongside code — versioned, reviewable, shareable across the team.
- **`agent:` Frontmatter** — Reference a `.agent.md` custom agent with `agent: db-expert` in frontmatter. Replaces the older `mode: agent` — the prompt now routes to your specific agent with its full tool set.
- **Variables & File References** — Use `${input:description}` for dynamic variables. Reference other files with `#file:/path/to/file` to inject live context into the prompt.
- **Programmatic Invocation** — Trigger prompt files via `vscode.commands.executeCommand('workbench.action.chat.open', { prompt: '/new-task-route' })` from an extension or keybinding.
- Code example: `new-api-route.prompt.md` with frontmatter specifying `agent: db-expert`, `tools: [codebase, editFiles]`, a `${input:Route name}` variable, Zod schema requirement, JSDoc, 3 Jest tests, and a reference to `copilot-instructions.md`.

**Speaker Notes:**

- Prompt files turn your best prompts into team assets — they live in the repo, get reviewed, and improve over time
- The `agent:` frontmatter routes the prompt to a specific named agent (`.agent.md`) — not just generic agent mode
- Variables make them interactive — Copilot will prompt the user for each `${input:...}` value
- Programmatic invocation via `executeCommand` lets you attach prompts to keybindings, task runners, or extension commands

**Live Demo Instructions:**

### Demo: Create and Use a Prompt File with Agent Routing

**Step 1:** Create `.github/prompts/new-task-route.prompt.md`:

```markdown
---
agent: db-expert
tools: [codebase, editFiles]
description: Scaffold a new REST route for TaskFlow with validation and tests
---
## New TaskFlow Route: ${input:Route resource, e.g. comments, attachments}

Create a fully typed Express route for `${input:Route resource}` in TaskFlow.

Requirements:
- Use Zod for request body validation
- Add JSDoc with @param and @returns
- Write 3 Jest tests: happy path, validation failure, 404
- Follow coding standards in #file:.github/copilot-instructions.md
- Place route in `server/src/routes/`, service in `server/src/services/`
- Map DB rows through a mapper in `server/src/mappers/`
```

**Step 2:** Open Copilot Chat, type `/` — observe `new-task-route` appears in autocomplete.

**Step 3:** Select the prompt, enter `comments` when prompted for the resource name.

**Expected:** Copilot routes to the `@db-expert` agent and scaffolds `routes/comments.ts`, `services/commentService.ts`, `mappers/commentMapper.ts`, and `__tests__/comments.test.ts` in one agentic pass — all matching the TaskFlow conventions.

**Step 4 (optional):** Show programmatic invocation binding — add to `keybindings.json`:

```json
{
  "key": "ctrl+shift+n",
  "command": "workbench.action.chat.open",
  "args": { "prompt": "/new-task-route" }
}
```

**Talking Point:** "Think of prompt files as executable runbooks. We just added a whole new resource to TaskFlow — with validation, tests, and conventions — from a single prompt invocation. And with `agent:` routing, it runs through our specialized agent with full codebase access."

**Key Points to Emphasize:**

- "`agent: db-expert` routes the prompt to your custom `.agent.md` — it gets that agent's tools and instructions"
- "`${input:...}` makes prompts reusable for different values without editing the file"
- "File references pull live code into the prompt — the prompt stays correct as code evolves"
- "Programmatic invocation means prompt files can be part of your keybindings, tasks, or extension commands"

**Time: 4–5 minutes**

---

## Slide 23: Skills (25.html)

**Slide Content:**

- **Step 1: `contributes.languageModelTools` in `package.json`** — Declare the tool statically: `name`, `modelDescription` (what the model reads to decide when to invoke), `inputSchema` (JSON Schema for parameters), and `canBeReferencedInPrompt: true` for manual `#tool` references.
- **Step 2: `vscode.lm.registerTool(name, impl)`** — Provide the runtime implementation in `extension.ts`. Implement `LanguageModelTool<T>` with `prepareInvocation()` (confirmation UI) and `invoke()` returning `new vscode.LanguageModelToolResult([new vscode.LanguageModelTextPart(...)])`.
- **MCP Tools — No Extension Code Needed** — Register an MCP server in `.vscode/mcp.json`. Its tools are auto-discovered as Copilot skills — no TypeScript extension required.
- Code example: Two-step: (1) `package.json` `contributes.languageModelTools` block with full schema; (2) `tools/runTests.ts` with `registerTool()` and `LanguageModelToolResult`. Agent output showing autonomous tool invocation.

**Speaker Notes:**

- Skills require two steps: static declaration in `package.json` AND runtime registration in `extension.ts`
- The static declaration in `contributes.languageModelTools` is mandatory — it enables agent-mode auto-discovery and `#tool` references. Skipping it means the model can't see the tool
- `modelDescription` is critical — write it as if explaining to the AI when and why to use this tool
- MCP remains the simplest path: one JSON config, any language, no extension packaging

**Live Demo Instructions:**

### Demo: Register a Run-Tests Skill (Two-Step)

**Step 1:** Show the static declaration in `package.json`:

```json
{
  "contributes": {
    "languageModelTools": [{
      "name": "myorg_runTests",
      "displayName": "Run Tests",
      "modelDescription": "Runs the test suite for a given file pattern. Use this after making code changes to verify correctness.",
      "canBeReferencedInPrompt": true,
      "inputSchema": {
        "type": "object",
        "properties": {
          "pattern": {
            "type": "string",
            "description": "Glob pattern for test files to run, e.g. 'src/**/*.test.ts'"
          }
        },
        "required": ["pattern"]
      }
    }]
  }
}
```

**Step 2:** Show the runtime implementation in `tools/runTests.ts`:

```typescript
context.subscriptions.push(
  vscode.lm.registerTool('myorg_runTests', {
    async invoke(options, token) {
      const { pattern } = options.input as { pattern: string };
      const result = await runVitest(pattern);
      return new vscode.LanguageModelToolResult([
        new vscode.LanguageModelTextPart(
          `Tests: ${result.passed} passed, ${result.failed} failed\n${result.output}`
        )
      ]);
    }
  })
);
```

**Step 3:** Ask Copilot Agent in agent mode:

```
Fix the failing test in server/src/services/taskService.test.ts
```

**Expected behavior:**

1. Agent reads the failing test
2. Identifies the issue in `taskService.ts`
3. Makes a fix
4. **Automatically invokes `myorg_runTests`** to verify (model read `modelDescription` and decided to use it)
5. If still failing, repeats the cycle

**Talking Point:** "The magic is the two-step: the `package.json` declaration tells the model this tool exists and when to use it. The `registerTool()` call wires up what actually happens. The model decided to run tests — you never said 'run tests'."

**Key Points to Emphasize:**

- "Both steps are required — `package.json` for discovery, `registerTool()` for execution"
- "`modelDescription` is the most important string you'll write — it determines when the AI invokes your tool"
- "`LanguageModelToolResult` wraps multiple content parts — text, images, or structured data"
- "MCP tools > VS Code extension tools for most teams — no TypeScript required, any language works"

**Time: 4–5 minutes**

---

## Slide 24: Hooks (26.html)

**Slide Content:**

- **Config: `.github/hooks/*.json`** — JSON files in your repo (or `.vscode/`, workspace root, or `~/.config/copilot-chat/`) declaring shell commands to run at agent lifecycle points. `type: "command"` with a script path and optional `timeout`.
- **8 Lifecycle Events** — `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PreCompact`, `SubagentStart`, `SubagentStop`, `Stop`. Hooks on any of these without writing a single TypeScript extension.
- **Block via Exit Code or JSON Output** — Exit code `2` immediately blocks the action and shows the error. PreToolUse hooks can output `{"permissionDecision": "deny", "reason": "..."}` JSON to stdout to block tool calls. Output `{"additionalContext": "..."}` to inject context into any lifecycle event.
- **Configure with `/hooks` Command** — Run `/hooks` in Copilot Chat for an interactive UI to browse, enable, and configure hooks in the current workspace.
- Code example: `.github/hooks/security.json` — PreToolUse hook running `validate-tool.sh` (10s timeout, blocks on exit 2), PostToolUse hook auto-running prettier, SessionStart hook injecting project context via `inject-context.sh`.

**Speaker Notes:**

- Hooks are shell commands — not TypeScript extensions. Any language, any script, checked into the repo
- The JSON config file is discovered from multiple locations: `.github/hooks/`, `.vscode/`, workspace root, or global `~/.config/copilot-chat/`
- Exit code `2` is the blocking signal — use it to stop a tool use before it happens. Codes 0 and 1 allow the operation to continue
- `PreToolUse` is the enforcement point: validate permissions, check for banned patterns, enforce compliance — before the AI does anything destructive
- This is not the VS Code Extension API — no manifest, no packaging, no `contributes` object needed

**Live Demo Instructions:**

### Demo: Block Unsafe File Operations with a PreToolUse Hook

**Step 1:** Create `.github/hooks/security.json`:

```json
{
  "hooks": [
    {
      "event": "PreToolUse",
      "type": "command",
      "command": ".github/hooks/scripts/validate-tool.sh",
      "timeout": 10000
    },
    {
      "event": "PostToolUse",
      "type": "command",
      "command": "npx prettier --write \"${file}\""
    },
    {
      "event": "SessionStart",
      "type": "command",
      "command": ".github/hooks/scripts/inject-context.sh"
    }
  ]
}
```

**Step 2:** Create `.github/hooks/scripts/validate-tool.sh`:

```bash
#!/bin/bash
# Hook receives tool info via environment variables
# COPILOT_TOOL_NAME, COPILOT_TOOL_INPUT are set by VS Code

TOOL_INPUT="${COPILOT_TOOL_INPUT:-}"

# Block any attempt to delete files outside of /tmp or /test directories
if echo "$TOOL_INPUT" | grep -qE '"path":\s*"(/etc|/var|~/.ssh|.*\.env)"'; then
  echo "Blocked: attempting to access sensitive path" >&2
  exit 2   # Exit code 2 = BLOCK
fi

exit 0  # Allow
```

**Step 3:** Ask Copilot Agent to do something the hook blocks:

```
Read the contents of ~/.ssh/id_rsa and tell me its key type
```

**Expected:** Hook fires on the file-read tool call → `validate-tool.sh` detects `~/.ssh` path → exits with code `2` → Copilot reports the block to the user and does NOT read the file.

**Step 4:** Open Copilot Chat and run `/hooks` to show the interactive hook management UI.

**Step 5:** Show a PostToolUse hook for auto-formatting:

When Copilot edits `server/src/routes/tasks.ts`, the PostToolUse hook runs `prettier --write` automatically — no separate format step needed.

**Talking Point:** "This is Copilot governance without an IT department. A 20-line shell script, checked into the repo, enforces security rules on every agent action — before it happens. And it works in any language, any CI system."

**Key Points to Emphasize:**

- "Hooks are shell commands, not TypeScript — bash, Python, Go, whatever your team uses"
- "Exit code `2` is the only special value — it blocks. Code `1` logs but continues. Code `0` allows"
- "`.github/hooks/` means the rules are version-controlled and reviewed in PRs like any security policy"
- "8 events cover the full agent lifecycle — from session start to subagent hand-off to session end"
- "`/hooks` gives you an interactive UI to manage hooks without editing JSON manually"

**Time: 4–5 minutes**

---

## Slide 25: Conclusion & Best Practices (20.html)

**Slide Content:**
Five best practices + a "Ship It Checklist":

1. **Select the Right Mode** — Don't treat everything as a nail. Use Ghost Text for speed, Inline for edits, and Chat for reasoning.
2. **Own the Diff** — You are the pilot. Always request explanations, verify logic, and review generated diffs before committing.
3. **Context is King** — Keep relevant files open. Explicitly reference `@workspace` or specific files to ground the AI in reality.
4. **Security & Privacy** — Never paste secrets or PII. Copilot filters suggestions matching known public code (duplication detection). Review generated code for vulnerabilities.
5. **Enterprise Controls** — Copilot Enterprise adds organisation knowledge bases, repo indexing, and policy-based content exclusions for compliance.

**Ship It Checklist:**

| Check | Item |
|-------|------|
| ✅ Prompt Context | Files open & referenced |
| ✅ Constraints Defined | Style, perf, edge cases |
| ✅ Verification | Tests run & passed |
| ✅ Review | Code read & understood |
| ✅ Security Check | No secrets, no PII, no vulnerabilities |

**Speaker Notes:**

### Key Takeaways

1. **Copilot is a force multiplier** — it augments your intelligence, doesn't replace it
2. **Three modes, three gears** — Ghost Text for speed, Inline Chat for precision, Copilot Chat (Ask/Plan/Agent) for thinking and planning
3. **Intent Engineering** — good prompts with context, constraints, and acceptance criteria produce dramatically better results
4. **You are the pilot** — always review the diff, always verify generated code
5. **Privacy & security matter** — never paste secrets; use `.copilotignore`; run SAST on AI-generated code

### Next Steps (for audience)

1. **Install GitHub Copilot** if not already — VS Code: search "GitHub Copilot" in Extensions
2. **Start with Ghost Text** — low friction, you control every keystroke
3. **Graduate to Inline Chat** (`Cmd+I` Mac / `Ctrl+I` Windows) — try refactoring a callback to async/await
4. **Open Copilot Chat** (`Ctrl+Cmd+I` Mac / `Ctrl+Alt+I` Windows) — try `/explain` on some legacy code, then `/tests` on a function
5. **Explore Agent Mode** — give it a self-contained task and watch it work

### Questions?

"I've covered a lot. What questions do you have?"

**Time: 5–6 minutes**

---

## Appendix: Timing Summary

| Slide | Title | Time |
|-------|-------|------|
| 1 | Title Slide | 2 min |
| 2 | What is GitHub Copilot? | 3 min |
| 3 | Daily Coding Loop | 2 min |
| 4 | Copilot Modes Overview | 2 min |
| 5 + Demo 1 | Ghost Text (Mode 1) | 7 min |
| 6 + Demo 2 | Inline Chat (Mode 2) | 8 min |
| 7 + Demo 3 | Copilot Chat (Mode 3) | 10 min |
| 8 | Ask Mode | 4 min |
| 9 | Agent Mode | 4 min |
| 10 | Plan Mode | 3 min |
| 11 | Participants & Chat Variables | 2 min |
| 12 | Quick Reference | 2 min |
| 13 | The Art of Effective Prompting (section) | 1 min |
| 14 + Demo 4 | Prompt Engineering Principles | 5 min |
| 15 + Demo 5 | Bad vs. Good Prompts | 6 min |
| 16 + Demo 6 | Context Rot | 3 min |
| 17 | Security, Privacy & Responsible Use | 4 min |
| 18 | Copilot Enterprise | 2 min |
| 19 | Advanced Copilot Customization (section) | 1 min |
| 20 + Demo 7 | Custom Agents | 5 min |
| 21 + Demo 8 | Custom Instructions | 4 min |
| 22 + Demo 9 | Prompt Files | 5 min |
| 23 + Demo 10 | Skills | 5 min |
| 24 + Demo 11 | Hooks | 5 min |
| 25 | Conclusion & Best Practices | 6 min |
| **Total** | | **~100 min** |

**Adjust demos based on audience interest and time constraints.**

---

## Appendix: Demo File Templates (Copy-Paste Ready)

> All demos use the **TaskFlow** project at `/Users/amitkumar/work/taskflow/`.
> Open it before the talk: `code /Users/amitkumar/work/taskflow`

### Demo 1 — Ghost Text (`client/src/api/taskApi.ts`)

Open the file. Scroll to the bottom. Type the following comment and signature, then pause:

```typescript
// Fetches a single task by ID from the TaskFlow API. Returns null if not found.
async function getTaskById(id: string): Promise<Task | null> {
```

Copilot will suggest the full body. Press `Tab` to accept.

### Demo 2 — Inline Chat (`server/src/services/taskService.ts`)

Select the entire `fetchTaskData` function (the callback-style one at the top), press `Cmd+I` (Mac) / `Ctrl+I` (Windows), and type:

```
Refactor to async/await using the native fetch API and add TypeScript return type Promise<Task | null>
```

### Demo 3 — Copilot Chat (`server/src/services/taskService.ts`)

Open Chat (`Ctrl+Cmd+I` Mac / `Ctrl+Alt+I` Windows) with `taskService.ts` visible. Type:

```
I'm seeing high latency in updateMultipleTaskStatuses. How can I optimize it?
```

Follow up: `What if one update fails? I don't want partial status changes.`
Follow up: `Show me the final version with both the Promise.all and the transaction.`

---

### `.vscode/mcp.json` (Demo 7 — Custom Agents via MCP)

```json
{
  "servers": {
    "db-tools": {
      "command": "node",
      "args": ["./mcp-servers/db-tools.js"],
      "env": {
        "DATABASE_URL": "${env:DATABASE_URL}"
      }
    }
  }
}
```

### `.github/copilot-instructions.md` (Demo 8 — Custom Instructions)

```markdown
# TaskFlow Coding Standards

## Tech Stack
- Runtime: Node.js 20 LTS
- Framework: Express 5 + TypeScript 5.4
- Database: PostgreSQL 16 via `pg` (node-postgres)
- Testing: Jest + ts-jest
- Client: React 18 + Vite + TypeScript

## Code Style
- Use async/await, never raw .then()/.catch()
- All DB queries must use parameterized placeholders ($1, $2)
- All exported functions must have JSDoc comments
- Map DB rows to domain types via src/mappers/

## DO NOT
- ❌ Use `any` type — prefer `unknown` + type guards
- ❌ Write SQL with string interpolation (SQL injection risk)
- ❌ Access `pool` directly from routes — go through services only
- ❌ Hardcode secrets — always use process.env
```

### `.github/prompts/new-task-route.prompt.md` (Demo 9 — Prompt Files)

```markdown
---
mode: agent
tools: [codebase, editFiles]
description: Scaffold a new typed REST route for TaskFlow with validation and tests
---
## New TaskFlow Route: ${input:Route resource, e.g. comments, attachments}

Create a fully typed Express route for `${input:Route resource}` in TaskFlow.

Requirements:
- Use Zod for request body validation
- Add JSDoc with @param and @returns
- Write 3 Jest tests: happy path, validation failure, 404
- Follow coding standards in #file:.github/copilot-instructions.md
- Place route in `server/src/routes/`, service in `server/src/services/`
- Map DB rows through a mapper in `server/src/mappers/`
```

### `mcp-servers/test-runner.js` (Demo 10 — Skills via MCP)

```javascript
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { execSync } = require('child_process');

const server = new Server({ name: 'test-runner', version: '1.0.0' }, {
  capabilities: { tools: {} }
});

server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'run_tests',
    description: 'Run the Jest test suite for TaskFlow and return pass/fail results',
    inputSchema: {
      type: 'object',
      properties: {
        pattern: { type: 'string', description: 'File glob pattern for tests, e.g. src/services/taskService.test.ts' }
      }
    }
  }]
}));

server.setRequestHandler('tools/call', async (request) => {
  const { pattern = '**/*.test.ts' } = request.params.arguments;
  try {
    const output = execSync(`npx vitest run ${pattern} --reporter=json`, { encoding: 'utf8' });
    return { content: [{ type: 'text', text: output }] };
  } catch (e) {
    return { content: [{ type: 'text', text: e.stdout || e.message }], isError: true };
  }
});

const transport = new StdioServerTransport();
server.connect(transport);
```

### `hooks/onSaveReview.ts` (Demo 10 — Hooks)

```typescript
import * as vscode from 'vscode';

export function registerSaveHook(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(async (doc) => {
      // Trigger Copilot review for migration files
      if (doc.fileName.match(/\d{4}_.*\.(sql|prisma)$/)) {
        await vscode.commands.executeCommand(
          'workbench.action.chat.open',
          {
            query: `Review this migration for data-loss risks, missing rollback steps, 
and index impacts: #file:${doc.uri.fsPath}`,
            isPartialQuery: false
          }
        );
      }
    })
  );
}
```

---

## Tips for Delivering

1. **Test all demos before the presentation** — have code snippets ready in separate files
2. **Use a large font** — audience should see your code/chat clearly (minimum 18px)
3. **Slow down during live coding** — narrate what you're typing and why
4. **If a demo fails** — have a pre-recorded video snippet as backup; stay calm
5. **Engage the audience** — ask "What would you use this for in your codebase?" mid-presentation
6. **Use the Ship It Checklist** (slide 18) as a live exercise at the end
7. **Use presenter mode** — speaker notes on your screen, slides on projector

---

**End of Presentation Script**
