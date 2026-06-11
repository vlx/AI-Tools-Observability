# **Aperture Version 2: User Interface Specification**

## **1\. Global Interface Framework & Design System**

The Aperture interface is engineered for high-density data visualization and operational clarity, utilizing a **Sleek Minimal-Cards** architecture. The framework prioritizes the removal of visual noise to facilitate rapid decision-making for Enterprise SaaS Observability.

### **1.1 Layout and Grid System**

* **Grid Specification:** All dashboard components are aligned to a **12-column fluid grid with 24px gutters**. This ensures consistent widget placement across varying screen resolutions.  
* **Edge-to-Edge Strategy:** To maximize the data visualization area, the interface utilizes collapsible utility panels instead of traditional persistent sidebars. This "Edge-to-Edge" philosophy provides an unobstructed canvas for complex time-series and flow diagrams.  
* **Typography:** The UI employs a high-contrast sans-serif for UI labels, while **all numerical values and telemetry data must use a Monospace font** to ensure tabular alignment and legibility in high-density views.

### **1.2 Global Controls and Theming**

* **Global Dark/Light Mode Toggle:** A universal state-switch that re-maps the color palette for interactive elements.  
  * **Logic:** Dark Mode utilizes a 900-depth background with 500-depth borders; Light Mode utilizes a 50-depth background with 200-depth borders.  
* **Global Property Tables:** Standardized Markdown tables are used for all configuration menus to maintain the minimalist aesthetic.

| Property | Implementation Detail | Data Type |
| :---- | :---- | :---- |
| **Grid Unit** | 8px Base Increment | Integer |
| **Border Radius** | 4px (Subtle) | CSS Variable |
| **Active State** | Accent-Blue-500 | Hex Code |

\--------------------------------------------------------------------------------

## **2\. Executive Cost Dashboard (Sankey Visualization)**

This view provides financial leaders with a real-time visualization of the **Consolidated Cost Allocator Mathematical Engine**.

### **2.1 Sankey Diagram Specifications**

The interactive Sankey Diagram maps the flow of expenditures from original providers to internal cost centers.

* **Node Mapping:**  
  * **Source:** GitHub, OpenAI, Figma, Cursor, Lovable.  
  * **Category:** Seat Subscriptions $(S\_t \\cdot N\_t)$ vs. Variable Consumption $(\\sum K\_{t,u} \\cdot P\_t)$.  
  * **Allocations:** Engineering, Product, Marketing.  
* **Visual Logic:** Link thickness is dynamically weighted by the result of the $C\_{total}$ calculation for that specific path.  
* **Global Spend Overview:** A primary card displays the aggregate $C\_{total}$ result in a 32pt Monospace typeface. This card serves as the real-time visual output of the mathematical sum of base seats $(S\_t, N\_t)$, variable units $(K\_{t,u})$, and cloud overages $(O\_t)$.

### **2.2 FR-3: Real-Time Anomaly Detection**

* **Triggering Logic:** A **Sticky Notification Header** appears when the daily cost growth rate for any internal cost center deviates by $\>7\\%$.  
* **Interaction Pattern:** The banner is persistent and remains at the top of the viewport across all tabs until acknowledged by a user with **Admin-level RBAC privileges**.

\--------------------------------------------------------------------------------

## **3\. SaaS License Optimization Matrix (Bubble Chart)**

The Optimization Matrix provides a functional interface for identifying and reclaiming unused licenses per **FR-6**.

### **3.1 Optimization Visualization**

* **Chart Configuration:**  
  * **X-Axis:** Days Since Last Active Message/Action (0–180 scale).  
  * **Y-Axis:** Monthly Seat Cost $(S\_t)$.  
  * **Bubble Size:** Projected Annual Savings $(Current S\_t \\times 12 months)$.  
* **Data Filtering:** Points are only rendered for users meeting the reclamation criteria (0 messages/actions over a rolling 30-day window).

### **3.2 Quick Actions Side Panel**

Clicking a bubble expands a side utility panel with the following specifications:

* **User Metadata:** Pseudonymized ID, Team, and Primary Tool.  
* **Cost Impact Preview:** A dynamic label showing the real-time drop in $C\_{total}$ if the seat is reclaimed.  
* **Primary Action:** A button labeled **"Orchestrate Deprovisioning"** which triggers the backend SCIM reclamation workflow.

\--------------------------------------------------------------------------------

## **4\. Unified Provider Health Monitor (Density Heatmap)**

The Health Monitor is a high-density SRE view for tracking external AI endpoint reliability and SLA compliance as per **FR-4**.

### **4.1 Global Reliability Heatmap**

* **Grid Definition:**  
  * **Columns:** 24-hour time increments (hourly buckets).  
  * **Rows:** AI Providers (OpenAI, Anthropic, Google Vertex, Azure OpenAI).  
* **Color Scale:**  
  * **Green:** Latency \< 500ms / 100% Uptime.  
  * **Yellow:** Latency 500ms–1500ms (Latency Spike).  
  * **Red:** Latency \> 1500ms or Status Code 5xx (SLA Breach).  
* **Hover State:** Hovering over any cell reveals a tooltip displaying the exact **Mean Latency (ms)** and **Success Rate %** for that hour.

### **4.2 Synthetic Probe Logs**

The Endpoint Reliability Probe executes synthetic pings at **60-second intervals**. Logs are displayed in a monospace table.

| Timestamp | Provider Endpoint | Latency (ms) | Status |
| :---- | :---- | :---- | :---- |
| 2026-03-20 10:00:01 | OpenAI GPT-4o | 412ms | 200 OK |
| 2026-03-20 10:00:05 | Anthropic Claude 3.5 | 890ms | 200 OK |
| 2026-03-20 10:01:02 | Google Vertex AI | 0ms | 503 ERR |

\--------------------------------------------------------------------------------

## **5\. FR-8: Predictive Cost Modeling View**

This interface allows for probabilistic forecasting of AI expenditures based on organizational growth and agentic adoption.

### **5.1 Forecasting Line Graph**

* **Data Logic:** Displays **Actual Spend** (solid) vs. **Predicted Spend** (dotted).  
* **Confidence Intervals:** Shaded alpha-transparent fills (0.15 opacity) represent variance driven by "probabilistic AI consumption" (e.g., unexpected reasoning cycles or token spikes).  
* **Currency Normalization:** The Y-axis converts all variable units $(K\_{t,u})$ into USD using the $P\_t$ (unit price) rate card from the Normalization Engine.

### **5.2 "What-If" Simulation Sliders**

Users can adjust the following variables to update the dotted forecast line in real-time:

* **Headcount Growth:** Increases the $N\_t$ variable across all tools.  
* **Agentic Feature Adoption:** Simulates an increase in high-complexity credit consumption.  
  * **Figma Make:** Increases $K\_{t,u}$ by 20 credits per execution.  
  * **Lovable Schema Gen:** Increases $K\_{t,u}$ by 1.2–2.0+ credits per action.

\--------------------------------------------------------------------------------

## **6\. Privacy-First Adoption & Enablement Panel**

In accordance with **FR-5**, this view monitors organizational maturity while strictly enforcing employee privacy.

### **6.1 Adoption Metrics & Privacy Shield**

* **Team Adoption Velocity:** Bar charts showing WAU-to-MAU ratios.  
* **Privacy Shield Enforcement:** The interface confirms **k-anonymity (k=5)**.  
* **Technical Constraint:** To ensure compliance, the API request itself is truncated at the normalization layer. Data for any team with fewer than 5 members is masked/greyed out in the UI and nullified in the data payload.

### **6.2 Feature Utilization Matrix**

This table compares tool usage depth across the organization.

| Complexity Tier | Consumption Rate | Common Tool Examples |
| :---- | :---- | :---- |
| **Low-Complexity** | 2–5 Credits / 0.5 Credits | Figma Vector Gen, Lovable Simple Edits |
| **High-Complexity** | 2–25 Credits | Figma Gemini 3 Pro Images, Lovable Auth Setup |
| **Agentic** | 20+ Credits | Figma Make, Automated Workflow Mapping |

\--------------------------------------------------------------------------------

## **7\. Connector Configuration & Ingestion Status**

Administrators use this interface to establish programmatic links to the four MVP AI providers.

### **7.1 Provider Connectivity Logic**

* **GitHub/OpenAI/Cursor:**  
  * **Field:** Admin API Key (Masked by default).  
  * **Interaction:** "Encrypted/Hidden" toggle to reveal key.  
  * **Metadata Tags:** For **Cursor**, the UI includes a field for **Virtual Tags** (e.g., `cursor:max_mode`) to track high-context window usage.  
* **Figma:**  
  * **Mechanism:** A dedicated **Drag-and-Drop Zone** for CSV exports from the Figma Admin Console (required due to lack of real-time API).

### **7.2 Ingestion Heartbeat Table**

Monitors the health of the multi-source telemetry pipeline.

| Connector | Last Successful Sync | Residency Region | Metadata Collected |
| :---- | :---- | :---- | :---- |
| **GitHub Copilot** | 2 mins ago | US-East-1 | Accepted Lines, IDE Platform |
| **Cursor IDE** | 5 mins ago | US-East-1 | Cache Read/Write Tokens |
| **ChatGPT Ent.** | 12 mins ago | EU-Central-1 | Message Count, Model Family |
| **Figma** | 24h ago | US-East-1 | Manual CSV Payload |

