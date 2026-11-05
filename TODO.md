# LearnMesh delivery outcomes

## 1. Persistent role-aware workspace shell
- Provide Student Portal and Faculty Portal contexts with demo profile switching instead of forcing authentication.
- Show the selected profile and role clearly: student Aarav Sharma (CSE2026A042, CSE, semester 5, section A, academic year 2026–2027) and faculty Dr. Ananya Rao (CSE, semester 5, section A, DBMS and Computer Networks).
- Keep a dark charcoal rounded left sidebar visible on desktop with Workspace, role-specific portal navigation, and the AI AGENT NETWORK section below it.
- Make the selected route remain selected after refresh and direct mobile navigation.

## 2. Direct AI Agent Network navigation
- Show Coordinator Agent, Tutor Agent, Assignment Generation Agent, Student Modeling Agent, Knowledge Tracing Agent, Learning Analytics Agent, Knowledge Graph Agent, Recommendation Agent, and Explainability Agent as separate clickable sidebar items.
- Each item includes an icon, agent name, status indicator, monitoring/active state, and selected state.
- Use the routes `/agents/coordinator`, `/agents/tutor`, `/agents/assignment-generation`, `/agents/student-model`, `/agents/knowledge-tracing`, `/agents/learning-analytics`, `/agents/knowledge-graph`, `/agents/recommendation`, and `/agents/explainability`.
- Do not hide the agents inside a combined chatbot page.

## 3. Dedicated agent workspaces
- Only Tutor Agent uses a conversational chat interface.
- Coordinator Agent has request type, academic context, student/section, selective agent list, execution trace, handoff timeline, specialist outputs, final coordinated recommendation, evidence, and Run coordination.
- Tutor Agent has chat, grounded responses, source citations, suggested questions, subject/unit/semester/section context, indexed document count, and RAG status.
- Assignment Generation Agent has curriculum controls, generated preview, edit/reorder, save draft, publish to section, supported question types, and faculty approval before publishing.
- Student Modeling Agent shows a structured learner profile with performance, completion, engagement, activity, strengths, weaknesses, preferences, trend, and refresh action.
- Knowledge Tracing Agent shows student/subject/unit/topic context, mastery category, confidence, evidence, prerequisite gaps, mastery timeline, and explanation using Not Started, Weak, Developing, Proficient, and Mastered states.
- Learning Analytics Agent shows deterministic metrics, grade distribution, student comparison, MSE 1 vs MSE 2, assignment completion, trends, progress bars, and at-risk students using charts, cards, and tables.
- Knowledge Graph Agent shows Subject → Unit → Topic → Concept → Prerequisite relationships, related concepts, weak links, course-to-topic map, and Explore graph action.
- Recommendation Agent shows student context, upcoming exam, weak topic, available study time, priority, next action, resource, reason, expected impact, and supporting evidence.
- Explainability Agent shows selected insight, student/section, evidence scope/timeline, marks/assignments/activity used, explanation summary, intervention, and Explain this signal action.

## 4. Academic context and responsive behavior
- Represent department, semester, section, subject, faculty mapping, student mapping, and academic year in visible context controls.
- Support exactly MSE 1 (Units 1–2, 50 marks), MSE 2 (Units 3–4, 50 marks), and End Semester (full syllabus, 100 marks).
- Make each workspace responsive for mobile with a collapsible navigation drawer and stacked panels.

## 5. Visual and interaction quality
- Use the uploaded reference image as visual direction: charcoal rail, pale sage/green accents, warm off-white workspace, rounded cards, airy analytics panels, strong hierarchy, and a premium product feel.
- Implement local loading, empty, success, and error feedback where relevant, with clear action buttons and evidence sections.
- Provide a dashboard overview with role-aware metrics, progress/analytics cards, upcoming academic items, and a featured AI network summary.

## 6. Faculty task-specific uploads and MSE evidence hub
- Add a separate upload workspace to each Faculty Portal task, with a task-specific label, accepted file formats, mapped faculty context, selected-file state, and upload action.
- Add a dedicated Faculty Portal item named MSE.
- In the MSE workspace, provide separate MSE 1 and MSE 2 sections for the same selected class. MSE 1 must accept a question paper and mark list; MSE 2 must accept a question paper and mark list.
- Let faculty add multiple class workspaces on the MSE page, switch the active class, see per-class upload completeness, and upload the selected files while retaining the class/assessment mapping.

## 7. Faculty class-centric MSE and assignment workflows
- Remove Marks Upload and Class Performance Analytics from the Faculty Portal navigation; MSE owns assessment marks and visual analytics.
- Rename My Sections to My Classes. Let faculty add, edit, and select classes; edit any class detail; choose strength; enter students manually; and import a student-list file.
- Make the selected class available to MSE, Assignment Management, Course Materials, Examination Schedule, Timetable, Student Tracking, Student Monitoring, and other relevant faculty workflows.
- Keep MSE 1 and MSE 2 records class-specific; allow visual analytics for MSE 1 only, MSE 2 only, or both combined, and keep analytics locked until a relevant marks sheet is uploaded.
- Expand Assignment Management to generate a reviewable assignment from a source document, instructions, course material, or optionally the selected class's MSE question papers; require faculty review before publishing.
