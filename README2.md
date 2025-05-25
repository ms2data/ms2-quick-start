# Credible Quick Start

Welcome to **Credible**, your AI-powered semantic data platform. Credible transforms the chaos of raw operational data into clean, governed, and AI-ready semantic models — and then makes those models usable everywhere. Whether you're a developer, analyst, product manager, or AI engineer, you work from the same shared foundation.

**Here’s how it works:**

- Using our VS Code **AI Copilot**, you generate rich, structured semantic models that define your business concepts, metrics, and relationships with precision. Our AI Copilot uses your operational tables, SQL logs, and catalog metadata to generate rich semantic models quickly and accurately.
- From there, your models become the foundation for a variety of trusted data experiences such as --
  _Natural Language Notebooks for ad hoc exploration, Embedded Data Apps, AI Agents powered by semantic understanding, and BI Dashboards (via a SQL interface)._

<img src="overview.png" alt="Overview Diagram" width="600"/>

This Quick Start Guide will walk you through building your first semantic model, publishing it, and choosing how you want to put it to work — based on your target roles and your goals.

> TODO: Update diagram.

# The Semantic Modeling Workflow

Credible helps you create, govern, and use semantic models of your business data — quickly and at scale. In this section, you’ll:

1. Build a semantic model using the Credible AI Copilot
2. Analyze data using Malloy notebooks
3. Publish your models and analyses to the platform

## Step 1: Build a Semantic Model with a Credible AI Copilot

At the core of Credible is the **semantic model**—a governed, versioned interface that defines how your data should be understood and used. Think of it as a **semantic API**: it captures not just structure, but business meaning. You’ll use the **MS2 AI Copilot in VS Code** to generate your first model using existing catalog metadata, query logs, and the structure of your data warehouse.

### Prerequisites

Before starting, make sure:

- An **MS2 admin has set up your organization** on the platform.
- You have a basic understanding of **Malloy**, the semantic modeling language Credible is built on. [View Malloy Docs →](https://malloydata.dev)

### Install the MS2 VS Code Extension

1. Open VS Code.
2. Go to the Extensions view (`Cmd+Shift+X`).
3. Search for `MS2` and install the extension.
4. _(Temporary)_ Find the installed Malloy extension and select **“Switch to Pre-Release Version.”**

> Note: The extension mostly works in Cursor, but it hasn't been fully tested—some features may be limited.

### Clone the Quick Start Package

```bash
git clone https://github.com/ms2data/ms2-quick-start.git
cd ms2-quick-start
code .
```

### Log In to MS2

1. In the VS Code Explorer sidebar, expand **“MS2 Service.”**
2. Click **“Sign In.”**
3. Click **“+ Add new organization”** and enter the name provided by your MS2 admin.
4. Complete the login flow in your browser (email or Google account).
5. When redirected back to VS Code, select the project: `ms2-quick-start`.

> ✅ Make sure you log in with the same email address your MS2 admin used to set up your access.

> TODO: Describe what logging in does. Discover connections, etc. so you don't have to have local database credentials.

### Generate Your Semantic Model

1. In the file view, create a new file: `ecommerce.malloy`
2. Open the Command Palette (`Cmd+Shift+P`) and run: **MS2: Suggest Semantic Model**
3. When prompted, enter a high-level prompt. For example: _Build a model of ecommerce data that makes it easy to analyze sales trends across different dimensions._

The copilot will generate a Malloy model with:

- Dimensions, measures, joins
- Common views and reusable queries
- Descriptions and documentation

> ⚠️ If any syntax errors remain, fix them manually before proceeding.

> TODO: We should stream results. The 30 second wait is too long. 4. Wait ~30 seconds. A complete Malloy model will appear in the editor, including:

### Review & Adjust

Your generated model is a strong starting point — but real-world accuracy matters. You can:

- Manually edit `.malloy` files
- Accept inline suggestions from the MS2 extension
- Press `Ctrl+Cmd+I` to open the prompt window and generate or modify code with natural language instructions

> 💡 The more accurate and complete your semantic model, the better your downstream analysis and AI performance.

## Step 2: Create a Notebook Analysis with a Credible AI Copilot

Notebooks in Credible combine the structure of a dashboard with the flexibility of a document. They’re governed, versioned, and powered by your semantic models.

### Create a New Notebook

1. Create a new file called: `sales_performance.malloynb`
2. Open the Command Palette (`Cmd+Shift+P`) and run: **MS2: Suggest Analysis Topics**
3. Enter a notebook description such as: _Explore product sales performance across various dimensions like product category, brand, distribution method, etc._

Credible will insert a sequence of structured analysis blocks—each one describing a business question to explore.

### Generate Malloy Queries

For each analysis block:

1. Refine the text description to reflect what you want to analyze.
2. In the MS2 toolbar of the code cell, click **“Generate.”**
3. Wait ~10–15 seconds. A Malloy query tailored to the prompt will appear.

> TODO: Why not just generate and execute all the cells at once? And, let folks refine and regenerate? The current workflow has a lot of back and forth during demos.

> 💡 You’re now describing data questions in plain English and letting the system handle the query writing.

### Run and Review

1. Check for errors in the generated code and fix if needed.
2. Click **“Run”** above the block to execute the query.
3. View your results as interactive tables or charts.

Repeat across the notebook to build a complete, presentation-ready analysis.

## Step 3: Publish to the Credible Data Platform

Publishing makes your semantic model and analysis available across the platform—ready to serve AI agents, applications, dashboards, and notebooks.

> TODO: Add a screenshot describing the MS2 local and remote package management panels

### Update the Package Version

1. Open the `publisher.json` file in your workspace.
2. Set the version to `0.0.1`:

```json
{
  "name": "ms2-quick-start",
  "version": "0.0.1",
  ...
}
```

### Publish from VS Code

1. In the Explorer panel, expand **“MS2 Local Packages.”**
2. You should see the package `ms2-quick-start`.
3. Click the **“Publish”** button.
4. When prompted, click **“Yes”** to confirm.

> 📡 This publishes your semantic model and notebooks to the Credible (MS2) platform under your organization and project.

### Confirm Successful Publication

1. In the Explorer panel, expand **“MS2 Service.”**
2. Click the **Refresh** icon (🔄).
3. Expand:`Packages` > `ms2-quick-start`
4. You should now see version `0.0.1` listed under the package.

> ✅ This confirms your semantic package is successfully published and available on the platform.

### Mission Accomplished

Your semantic model and analysis notebook are now:

- **Governed** and version-controlled
- **Discoverable** and queryable via APIs and notebooks
- **Ready** for use in embedded apps, dashboards, or AI agents

<br>

# Credible Data Adventures

Now that your semantic models and notebooks are published, it’s time to put them to work.

Most data tools are built with a single persona in mind: the analyst, the engineer, the business user. That leads to fragmented workflows, mismatched definitions, and yet another silo in the stack. **Credible is different.**

Credible is a **semantic data platform** — designed to unify how your organization defines, governs, and uses data, across different roles, teams, and tools. Whether you're writing code, building apps, exploring data, or enabling AI, you work from the **same shared semantic foundation**.

Credible offers multiple, role-tailored ways to consume your semantic models. Pick the path (or paths) that suit your target roles and goals best — and build from a single source of truth.

<hr>
<details>
<summary>
    <strong>Option 1: Natural Language Notebooks (No-Code + AI)</strong>
    <ul>
        <li><b>Best for:</b> Business analysts, product managers, less-technical users</li>
        <li><b>Interface:</b> AI-powered notebook in the Credible platform</li>
    </ul>
</summary>

Credible’s data platform includes an intelligent, notebook-based interface that combines:

- **Natural language prompts**
- A visual, no-code **Malloy Explorer**
- Governed semantic models behind the scenes

This enables fast, confident data exploration—without needing to write SQL or Malloy.

### How to Get Started:

1. Go to the Credible platform in your browser.
2. Click **“New Notebook.”**
3. Enter a question like:  
   _“What were our top 5 products by revenue last quarter?”_
4. Explore results visually. Use Malloy Explorer to refine or pivot the analysis.

> ✅ Great for ad hoc reporting, fast insights, and sharing lightweight dashboards.

</details>

<hr>
<details>
<summary>
    <strong>Option 2: Embedded Data Apps (React SDK)</strong>
    <ul>
        <li><b>Best for:</b> Software engineers building data-driven apps</li>
        <li><b>Interface:</b> React SDK with embeddable components</li>
    </ul>
</summary>

Credible makes it easy to embed governed analytics into your web applications—directly from your semantic models and notebooks. The SDK lets you drop live visualizations, metrics, or full analyses into your product with just a few lines of code.

### Try the Sample App

1. Open the `sample_data_app` folder included in the Quick Start repo.
2. Run the following commands to start the app:

   ```bash
   cd sample_data_app
   npm install
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.  
   You should see a placeholder dashboard with some fake charts.

> 🔐 **Note:** If you’re not already logged into MS2, the app may prompt you to sign in before embedded content loads.

### Embed a Published Analysis

You can embed any analysis cell from your published Malloy notebook directly into the app.

> TODO: We should embed the whole notebook.

1. In your notebook on the Credible platform, find the analysis block you want to embed.
2. Click the **“Embed”** button in the **MS2 toolbar** for that block.
3. Copy the embed code provided in the dialog.

### Add the Embed to Your App

1. Open `Dashboard.tsx` inside the `sample_data_app` project.
2. Replace the `<MainGrid />` placeholder with your copied embed code.

   For example:

   ```tsx
   // TODO: Add correct embed code here

   import { CredibleEmbed } from "@credible/sdk";

   export default function Dashboard() {
     return (
       <div className="dashboard">
         <CredibleEmbed
           notebook="sales_performance"
           block="top_products_by_revenue"
         />
       </div>
     );
   }
   ```

3. Save the file and refresh your browser.  
   You should now see live, governed analytics served directly from your semantic model.

> ✅ Great for building internal tools, customer-facing dashboards, or any UI that needs trustworthy data experiences.

> 🔁 You can reuse this pattern to embed multiple notebook blocks, semantic model views, or even full interactive dashboards—all powered by a single semantic definition.

</details>

<hr>
<details>
<summary>
    <strong>Option 3: AI Agents (Model Context Protocol)</strong>
    <ul>
        <li><b>Best for:</b> AI/ML developers using tools like Claude, Cursor, or custom agents</li>
        <li><b>Interface:</b> Model Context Protocol (MCP)</li>
    </ul>
</summary>

Credible supports the **Model Context Protocol (MCP)**—a framework that allows AI agents to:

- Discover your semantic model’s metrics, dimensions, relationships, and lineage
- Ask intelligent, business-aware questions
- Receive explainable, consistent responses

> TODO: Uses your semantic models rich documentation, descriptions, and metadata to ensure the agent is asking the right questions and getting the right answers.

### How to Get Started:

1. In your MCP-compatible tool (like Claude desktop or Cursor), connect to your organization’s MCP endpoint.
2. Select the semantic model or project you want to use.
3. Ask natural language questions like:  
   _“What’s the quarterly trend in net revenue per product line?”_

> ✅ Great for trustworthy AI copilots, conversational analytics, and embedded intelligence.

</details>

<hr>
<details>
<summary>
    <strong>Option 4: Traditional Dashboards (SQL Interface)</strong>
    <ul>
        <li><b>Best for:</b> Analysts using Looker, Tableau, Power BI, Metabase, etc.</li>
        <li><b>Interface:</b> SQL access to semantic models _(coming soon)_</li>
    </ul>
</summary>
<br>

Soon, you’ll be able to query Malloy models using SQL directly. This enables:

- Semantic consistency in legacy dashboards
- Reduced maintenance and duplication of logic
- A bridge from your existing BI tools into the semantic layer

> ✅ Great for organizations that want governed, trusted definitions in familiar tools.

</details>
<hr>

### More options coming soon...

<br>

# What’s Next?

Choose the consumption path(s) that match your workflow and:

- Start building semantic-powered applications
- Share notebooks with stakeholders
- Connect AI agents to drive smart, explainable automation
- Prepare to unify dashboards via the upcoming SQL interface

When you're ready to go deeper:

- 🤝 [Request a Personalized Walkthrough](#)

> TODO: Portal, CLI, etc.
