# Design Journal: Aperture Observability Platform

This document captures the chronological design and development decisions made during the construction of the Aperture Observability Platform interface. It serves as a historical record of how PRD requirements and initial concepts were polished through ongoing user guidance and design critiques.

## 1. Predictive Modeling: Refining Controls
- **Starting Point:** Initial implementation featured generic "Macro" and "Micro" segmented controls tucked into a narrow sidebar.
- **User Guidance & Reasoning:** The labels "Macro" and "Micro" lacked clear context for the user's intent. Furthermore, as view switchers that logically change the entire context of the screen, the toggle felt cramped and misplaced in the sidebar layout. 
- **Result:** Updated the labels to actionable terms: "What-If Scenarios" and "Custom Forecasting". Moved the segmented control out of the sidebar and placed it globally next to the page header to clearly visually indicate that it controls the full-screen view.

## 2. Admin Portal: Initial Concepts
- **Starting Point:** An empty route placeholder and foundational PRD knowledge. 
- **User Guidance & Reasoning:** Directed the workflow to explicitly define the primary purpose, main user intents, and information prioritization before writing code. The goal was to establish an administration screen focusing on configuring infrastructure tracking, AI tools, and access control without overwhelming the user.
- **Result:** Designed a comprehensive single-view portal covering Data Connectors (API gateways, manual CSV payloads), an Ingestion Heartbeat table, Role-Based Access (RBAC) matrices, and a Compliance & Audit log.

## 3. Admin Portal: Structuring & The AI Portfolio
- **Starting Point:** A dense, single-view portal that heavily mixed infrastructure details with business logic. The user also pointed out a missing conceptual link: *"Where can I find the administration list of all specific AI tools we track?"*
- **User Guidance & Reasoning:** The user perceived that the portal was becoming too complex and suggested separating it into distinct structural perspectives (Infrastructure vs. Business Logic vs. Compliance). Additionally, the user directed that the AI tools listed in the management portal must exactly mirror the existing tools visible on the Executive Dashboard to ensure strict data congruency across the platform.
- **Result:** Introduced top-level segmented tabs: "Data Connectors", "AI Portfolio", and "Security & Access". Created a dedicated "Tracked AI Portfolio" table that maps individual 3rd-party platforms (e.g., Cursor IDE, GitHub Copilot, Figma) to their telemetry ingestion sources and seat counts, perfectly synchronizing with the Dashboard's dataset.

## 4. UI Polish: Interaction Design for Connectors
- **Starting Point:** The Data Connectors tab featured an "Add Connection" button sitting strangely above two configuration cards ("API Key Management" and "Manual Ingestion"). The cards had inconsistent UI states—one looked permanently 'active' or 'pressed' (blue background), while the other just had a basic hover effect.
- **User Guidance & Reasoning:** The user critiqued this visual ambiguity. It was unclear if the top button was a third, independent option, or if the cards beneath it were active toggles vs. actionable buttons. The visual states clashed with the intended interaction (adding a new source).
- **Result:** Unified the interaction patterns. Removed the redundant top button and refactored the two cards to act as clear, equal call-to-action buttons underneath an "Add New Data Source" heading, giving them both consistent, polished hover transitions and clear icon visual feedback.

## 5. Navigation & Information Architecture
- **Starting Point:** The main sidebar navigation was ordered chronologically based on when we built them: Dashboard -> License Optimization -> Health Monitor -> Adoption -> Predictive Modeling -> Admin.
- **User Guidance & Reasoning:** The user proposed evaluating the navigation order from the perspective of the main persona (business executive/manager) and the core platform goals. "Health Monitor" was identified as a diagnostic/infrastructure tool, rather than a top-level strategic view, making it out of place in the main navigation and distracting from business value. 
- **Result:** 
  1. Relocated the "Health Monitor" view entirely, making it a fourth tab within the "Admin Portal" to successfully consolidate all infrastructure and diagnostic tools into one logical locus.
  2. Reordered the main sidebar navigation to reflect a logical, top-down business value flow: Executive Dashboard -> Adoption & Enablement -> License Optimization -> Predictive Modeling -> Admin Portal.
