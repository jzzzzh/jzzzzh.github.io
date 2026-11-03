# LLM Research Resume Implementation Plan

**Goal:** Turn the personal homepage into a bilingual research CV emphasizing LLM reasoning, agents, and multimodal RAG.

**Execution:** GPT owns this design and acceptance review; MiniMax performs the bounded implementation in an isolated snapshot. GPT reviews and applies the patch, then verifies in a browser. No commits, push, deployment, PDF edits, dependency installation, or unrelated changes.

**Architecture:** Buildless semantic HTML, shared `resume.css` and `resume.js`. Both existing entry points (`index.html`, `index_beauty.html`) present the same current resume; use identical HTML to avoid a stale alternate profile. Existing project pages/assets remain available. No external runtime dependencies.

**Source of truth:** Current, locally modified `data/ZhuohangJiang-CV-CN.pdf` and `data/ZhuohangJiang-CV.pdf`, ahead of old homepage text. Leave both PDFs untouched. Source facts below are extracted from these PDFs; preserve publication track qualifiers and distinguish relative percentages from score points. Do not invent experience, tool mastery, or acceptance status.

## Design decisions

- Choose a restrained editorial resume: warm off-white canvas, white document, dark ink, muted teal accents, fine rules, compact timeline dates, readable system fonts. Approximately 1040px maximum width. Avoid marquees, decorative diagrams, scrolling animations, huge heroes, excessive badges, and old news feeds.
- Alternatives considered: merely restyling the old academic homepage leaves a long publication/news hierarchy; a portfolio landing page further dilutes resume detail. A dedicated resume structure best serves readers evaluating LLM work.
- Header: name in both scripts, LLMs / AI Agents / Multimodal RAG / Reasoning, short PhD affiliation, local portrait, contact links, both PDF downloads, EN/中文 and theme controls. Default English, retain existing language preference where feasible, validate persisted values. Controls accessible by keyboard, selected states and document language accurate; storage failures must not disable page.
- Short profile emphasizing research, no unsupported citation totals or broad conference-tier claims. Keep education concise and lead quickly into experience and research.
- Section order: Research profile; Education; Industry experience; Selected research; Additional research (collapsed); Honors & skills. Anchor navigation may link Education, Experience, Research, Skills. Make print output hide controls/nav and render a legible single-language document.
- Research order: HiBench, SUPERGLASSES / SUPERLENS, A/B Agent, QA-Dragon, AIR. Each entry needs role, exact venue/track/status, concrete implementation contribution, measured results, and source links. AIR is last and focuses on LLM intent reasoning and reusable retrieval, not recommendation branding. Keep original formal paper title available in a citation/details line if needed; do not misrepresent it as a different paper.
- Hide recommendation business emphasis: omit GMV, ranking metrics, recommendation-focused headings and narrative. A/B Agent remains prominent as a self-evolving agent. The formal AIR paper title may include Recommendations as bibliographic accuracy requires.
- Additional research: concise native details/summary for the existing WebAgents survey (KDD 2025, arXiv:2503.23350) and hierarchical pragmatic conversations (AACL-IJCNLP 2026 Main). Earlier vision work need not dominate. Do not label preprints as accepted.
- Email must work with mailto even without JS. Optional email/WeChat copy uses success only after clipboard actually succeeds; errors have clear fallback. No fake links or broken placeholder buttons.

## Verified source facts and links

- Name: 蒋卓航 / Zhuohang Jiang. Email: zhuohang.jiang@connect.polyu.hk. GitHub https://github.com/jzzzzh. Scholar https://scholar.google.cz/citations?hl=zh-CN&user=h3vEhrgAAAAJ. Portrait images/zhuohang.jpg. WeChat zhuohangjiang.
- PolyU PhD Computer Science, Sep 2024–Present; advisors Qing Li and Wenqi Fan; GPA 3.60/4.00. Sichuan University BEng Computer Science and Technology, Sep 2020–Jun 2024; major GPA 3.79/4.00, overall 3.78/4.00. Use PhD student/researcher, not PhD Candidate (candidacy not confirmed).
- Kuaishou Technology, Research Intern, Short-Video E-commerce, Oct 2025–Present. AB Agent structures historical strategies/code changes, parameters and results as retrievable units; connects experiment comparisons, tuning proposals, configuration checks/review and feedback updates. AIR decomposes LLM intent semantics into reusable atomic knowledge; online retrieval/composition avoids live LLM calls. Omit GMV from both descriptions.
- HiBench: first author/project lead, KDD 2025 Benchmark & Dataset Track. Tree/JSON/formula generators with controlled depth/width/node count, algorithmic answers, unified prompts, code/paper tasks. 30 tasks, 39,519 queries; 20 LLMs across 10 families; representation/complexity/CoT evaluation. Instruction tuning yields average relative gains 88.84% Llama-3.1-8B, 31.38% Qwen2.5-7B. https://arxiv.org/abs/2503.00912 ; https://github.com/jzzzzh/HiBench ; https://huggingface.co/datasets/zhuohang/HiBench .
- SUPERGLASSES / SUPERLENS: first author, CVPR 2026 Findings. 2,422 real-device QA pairs, 14 domains, 8 question types with tool traces. Domain routing direct answer/RAG; open-vocabulary small-object localization; multi-hop decomposition; image/text search; HTML cleaning, chunk reranking; query→URL and URL→content Redis caches. 26 model/RAG variants. Qwen2.5-VL-7B score 32.82→44.10, +11.28 points. https://arxiv.org/abs/2602.22683 .
- A/B Agent: first author, arXiv:2608.04625 (2026 preprint). Experience tree organized by domain/scenario/stage/objective; sparse+dense retrieval, path proximity boosts, Qwen-Reranker. Evidence-backed configurations, feasibility/guardrail screening. Experiment tree records strategy/parameters/results/context; parent-child and sibling comparison; confidence-weighted gains and guardrail penalties guide local search or switching branches. https://arxiv.org/abs/2608.04625 .
- QA-Dragon: first author, KDD Cup 2025 Workshop on Multimodal Retrieval Augmented Generation. Query-aware routing of draft answers to direct output/search verification/RAG; tool selection by knowledge gaps; target cropping, image/text retrieval and evidence reranking, answer verification. Single-source/multi-source/multi-turn gains 5.06% / 6.35% / 5.03%. https://arxiv.org/abs/2508.05197 .
- AIR: first author, KDD 2026 Applied Data Science Track. Formal title Atomic Intent Reasoning: Bringing LLM Semantics to Industrial Cross-Domain Recommendations. Offline LLM generates hierarchical intent paths from behavior/attributes/object descriptions, caches reusable atoms; online time-decayed weighted intent trees retrieve chains and fuse evidence with multi-head attention, no live LLM calls; approx 400× throughput. https://arxiv.org/abs/2606.10357 .
- Honors: KDD 2025 Reasoning Day invited talk; KDD Cup 2025 CRAG-MM 12th globally, team lead; NeurIPS 2024 Spotlight, co-first author (earlier vision research; don't imply LLM award).
- Skills: PyTorch, Hugging Face, RAG, agent systems, Docker, Git. Mandarin native; IELTS 6.5. Do not add speculative frameworks.

## Implementation tasks

1. MiniMax rewrites only `index.html`, `index_beauty.html`, and creates `resume.css`, `resume.js`. Use semantic sections/articles, h1/h2/h3 hierarchy; native details for optional items; readable compact prose in both languages. Both PDF links remain reachable regardless of language. No source PDF changes.
2. MiniMax adds responsive styles for 360px mobile, tablet, desktop; date rows wrap safely, portrait shrinks, navigation/controls don't overlap. Use visible focus, sufficient contrast, prefers-reduced-motion and print media rules. Main content remains readable without JS; JS enables switching and persistence.
3. GPT reviews the complete patch, checks authorized paths/current baselines, applies only after `git apply --check`. Independently checks every metric, role, date and venue against the source facts.
4. GPT serves the static checkout and exercises both entry points, English/Chinese persistence, theme, links/anchors, collapsed research, and print styles. Capture desktop/mobile screenshots and inspect for clipping/overflow/contrast. Verify local assets/PDF targets, JS syntax, duplicate IDs, and no browser errors. Static site has no application build step.

## Acceptance focus

- First screen communicates LLM research instead of recommendation work.
- Research entries are sufficiently detailed to establish individual contributions; percentages and point changes retain meaning.
- English and Chinese contain matching facts; switching updates html lang and button selected state.
- localStorage unavailable/invalid values, clipboard failure, JS disabled: core content/contact/downloads remain usable.
- Both entry points work at 360/390px and 1440px with no horizontal scrolling; dark mode and print are legible.
- Existing modified PDFs remain byte-for-byte unchanged; no unrelated source changes; no commit or deployment.

## Execution and acceptance record

- MiniMax completed task `10dff06c-dd48-42b5-9cca-065c966e7bbe` successfully, editing only the four specified files. GPT inspected the candidate files, normalized missing new-file metadata in the generated patch, verified applicability, and applied it.
- GPT corrected the overview's classification of AIR (offline-to-online intent reasoning, rather than a self-evolving agent), removed an unsupported per-sample trace claim, improved dark-mode button contrast, allowed narrow contact rows to wrap, and allowed long sections to paginate.
- Passed: JavaScript syntax, matching entry points, unique IDs, local link/anchor targets, research order and key source metrics/status, whitespace checks. A temporary Node VM harness exercised language and theme controls, selected states, invalid and blocked localStorage, and clipboard success/failure. This harness is not a browser layout test.
- Both existing PDF SHA-256 hashes match the pre-execution baseline. No commits, push, or deployment were performed.
- Visual acceptance is incomplete: the browser origin permission gate refused access to the local preview. No browser screenshots, responsive layout measurement, or print preview were obtained. These cannot be claimed as passed.
