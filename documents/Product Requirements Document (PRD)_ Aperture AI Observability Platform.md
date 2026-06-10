# **Product Requirements Document (PRD): Aperture AI Observability Platform**

## **1\. Executive Product Overview**

Aperture is a specialized software-as-a-service (SaaS) observability console designed to resolve the "administrative crisis" of decentralized AI adoption. As organizations mandate the use of generative and agentic AI, infrastructure leads have lost visibility into variable consumption layers (tokens, credits, hosting) and operational reliability across third-party tools.

Aperture unifies billing metadata, endpoint health, client-side events, and HRIS data into a single control plane. The platform provides comprehensive oversight for the four primary drivers of enterprise AI spend: **GitHub Copilot, ChatGPT Enterprise, Cursor IDE, and Figma.** By normalizing disparate telemetry, Aperture empowers organizations to optimize licensing efficiency and ensure a quantifiable return on AI investment.

## **2\. Market Context & Stakeholder Analysis**

### **2.1 Stakeholder Requirements Mapping**

| Stakeholder | Core Pain Point | Critical Requirement |
| :---- | :---- | :---- |
| **CIO & IT Operations** | Management overhead of disparate vendor portals and Shadow AI risks. | Unified control plane for provisioning, SSO/SCIM mapping, and auditing unapproved extensions. |
| **SRE & Gateway Operations** | Productivity degradation during third-party LLM outages (e.g., Anthropic or OpenAI downtime). | Real-time endpoint health monitoring and SLA-based traffic routing/failover metrics. |
| **FinOps & Procurement** | Unpredictable, "probabilistic" costs and "seat rot" (inactive licenses). | Granular cost attribution and automated reclamation workflows for licenses with zero 30-day activity. |
| **HR & Enablement** | Massive usage disparity between power users and the general workforce. | Aggregated adoption telemetry to target training while maintaining the k=5 privacy floor. |
| **Line-of-Business Leaders** | Inability to justify high-cost AI investments to the board. | Correlation of AI usage with downstream productivity (e.g., **GitHub PR cycle times**, **HubSpot conversion rates**). |

### **2.2 The Strategic Moat (Market Gap)**

Traditional observability platforms like **Arize** or **Langfuse** focus on "Internal Model Tracing"—troubleshooting custom-built RAG pipelines. Conversely, SaaS security tools like **Knostic** focus on "Static Policy Enforcement" and threat prevention.

Aperture defines a new category: **External Tooling Governance**. We bridge the gap between technical reliability (SRE) and financial accountability (FinOps) for the third-party AI ecosystem, which currently lacks a standardized telemetry interface.

## **3\. High-Level Architecture & Data Flow**

Aperture utilizes a decoupled cloud architecture to ingest, normalize, and secure multi-vendor telemetry:

1. **SaaS API Ingestors:** Cron-based microservices that programmatically fetch billing and message metadata from official vendor APIs (GitHub, OpenAI, Cursor).  
2. **Client-Side Gateways:** Lightweight browser and IDE agents that detect unauthorized "Shadow AI" usage and capture localized interaction events.  
3. **Endpoint Reliability Probe:** Distributed synthetic checkers that continuously monitor the latency and availability of provider endpoints to track contractual SLAs.  
4. **Normalization & Predictive Cost Engine:** A standardization layer that converts disparate units (tokens, credits, seats) into a unified financial model.  
5. **Anonymization Buffer:** The mandatory enforcement point where PII is hashed and k-anonymity (k=5) is applied before any data is persisted to the ledger.  
6. **Presentation Web Portal:** A role-based dashboard providing financial, operational, and adoption insights for enterprise stakeholders.

   ## **4\. Functional Requirements (FR)**

| ID | Requirement Title | Priority | Description |
| :---- | :---- | :---- | :---- |
| **FR-1** | Multi-SaaS Ingestion | Critical | Programmatic ingestion of telemetry via APIs and primary CSV parsing for tools lacking API exposure (Figma). |
| **FR-2** | Normalized Cost Mapping | Critical | Standardization of billing units (Figma credits, Cursor tokens, Lovable VM tiers) into a unified engine including fixed infra minimums. |
| **FR-3** | Anomaly Detection | High | Real-time monitoring of consumption trends; alerts on daily cost growth deviations \> 7%. |
| **FR-4** | SLA Monitoring | High | Continuous synthetic pings to track provider uptime and response latency for operational reliability. |
| **FR-5** | Privacy-First Anonymization | Critical | Pseudonymization of user IDs at ingestion and enforcement of a k=5 anonymity floor for all team views. |
| **FR-6** | Automated License Reclamation | High | Identification of inactive accounts (30 days zero activity) to trigger deprovisioning and immediate cost recovery. |
| **FR-7** | Shadow AI Discovery | Medium | Detection of unauthorized AI extensions or browser-based usage to drive Cost Avoidance metrics. |
| **FR-8** | Predictive Cost Modeling | High | Ingestion of dynamic HR forecasting data (attrition, hires) to generate future spend projections. |

   ## **5\. The Aperture Mathematical Engine**

   ### **5.1 Consolidated Cost Allocator**

To normalize expenditure across different tools (T) and users (U), the engine calculates current spend including fixed infrastructure minimums:

$$
C\_{total} \= \\sum\_{t \\in T} (S\_t \\cdot N\_t \+ \\sum\_{u \\in U} (K\_{t,u} \\cdot \\vec{P\_t}) \+ O\_t)
$$

* $S\_t$: Base monthly subscription cost per seat.  
* $N\_t$: Active seat allocation count.  
* $K\_{t,u}$: Unit volume consumed by user u.  
* $\\vec{P\_t}$: **Price Vector.** For tools like Cursor, this represents a vector of prices (Input, Output, Cache Read, Cache Write) rather than a scalar value.  
* $O\_t$: **Variable Overages & Fixed Minimums.** Includes mandatory cloud infrastructure (e.g., the $300/year Supabase minimum for Lovable.dev deployments).

  ### **5.2 Predictive Cost Forecaster (FR-8)**

The predictive engine incorporates HRIS data to forecast future budgetary requirements:

$$
C\_{predicted} \= \\sum(S\_t \\cdot (N\_t \+ H\_t \- A\_t) \+ \\sum(K\_{t,u} \\cdot \\vec{P\_t} \\cdot D\_u) \+ O\_t)
$$

* $H\_t$: Forecasted New Hires (incremental seat growth).  
* $A\_t$: Forecasted Attrition (seat reduction).  
* $D\_u$: **Dynamic Workday Factor.** A usage multiplier calculated as $\\frac{\\text{Planned Work Days}}{\\text{Total Business Days}}$ in a given month to account for holidays and leave.

  ## **6\. Multi-Vendor Telemetry & Integration Specs**

* **GitHub Copilot:** REST API integration for daily aggregated metrics. Aperture specifically ingests lines of code (LOC) suggested, accepted, and deleted to correlate with PR cycle times.  
* **Cursor IDE:** Integration via Read-only Admin API Key. Must distinguish between standard tokens and **Cache Reads/Writes**. Use the `cursor:max_mode` tag to identify high-context (and high-cost) developer sessions.  
* **ChatGPT Enterprise:** Concurrent use of the OpenAI Compliance API (for raw metadata) and Workspace Analytics (for message counts/custom GPT usage) without exposing sensitive message content.  
* **Figma:** **\[Roadmap Risk\]** As of 2026, Figma does not expose a programmatic billing API. The **CSV parser is the primary ingestion method**. It must differentiate between the 4,250 credit Enterprise allocation and the 500 credit Collaborator tier.  
* **Lovable.dev:** Capture of credit-based actions (0.5–2.0 credits per edit) and variable VM tier costs (Tiny to Large).

  ## **7\. Data Privacy & Non-Functional Requirements (NFR)**

* **Scalability:** Ingestion pipeline must process 20M daily events and support 50k concurrent seats.  
* **Security:** AES-256 encryption at rest; TLS 1.3 in transit.  
* **Local Data Residency:** Mandatory support for local data residency configurations to meet regional enterprise compliance requirements.  
* **Privacy Floor:** Strict enforcement of k-anonymity (k=5) at the Anonymization Buffer.  
* **Regulatory Compliance:** Full alignment with GDPR, CCPA, and the EU AI Act's ban on emotion monitoring/biometric categorization in the workplace.

  ## **8\. User Interface & Reporting Specifications**

* **Executive Cost Dashboard:** High-level trend lines, cost-center breakdowns, and real-time anomaly banners for runaway consumption.  
* **Predictive Budget Planner:** Visualization of C\_{predicted} by layering HRIS forecasting (hiring/attrition) over current consumption trends.  
* **SaaS License Optimization Matrix:** 30-day inactivity tracker identifying "seat rot" with one-click deprovisioning workflows.  
* **Unified Provider Health Monitor:** Technical view of synthetic latency tests and global uptime across OpenAI, Anthropic, and Azure.  
* **Privacy-First Enablement Panel:** Adoption velocity and prompt counts masked for any cohort with fewer than 5 members.

  ## **9\. Strategic Implementation Roadmap**

* **Phase 1 (Month 1): Instrumentation & Directory Mapping.** Establish API/CSV connections and map telemetry to HRIS for unified cost allocation.  
* **Phase 2 (Month 2): Discovery & Reclamation.** Activate Shadow AI discovery to identify **Cost Avoidance** opportunities and execute first license reclamation cycle.  
* **Phase 3 (Month 3): Predictive Activation & ROI.** Deployment of C\_{predicted} forecasting and correlation of usage with productivity metrics (e.g., cost-per-merged-PR via GitHub cycle times).

