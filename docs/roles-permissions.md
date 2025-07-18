

# **Credible Data: Permissions and Collaboration Guide**

Welcome to the definitive guide on permissions and collaboration in Credible. A core strength of the Credible platform is its ability to facilitate both governed data modeling and flexible, collaborative analysis. This is all underpinned by a robust system for managing access to your data and content.

This guide explains Credible's resource hierarchies, the two-axis permission model, and how to use these tools to collaborate effectively and securely.

## **Understanding Credible's Structure**

Credible organizes work into two distinct hierarchies that serve different purposes:

* **Projects and Packages (The Governance Hierarchy):** A Project is a container for a specific initiative or team (e.g., "Marketing Analytics"). It holds your data connections and governed, version-controlled Packages. A Package contains the core assets of your semantic model: the .malloy model files, a package.json manifest, code-based notebooks and dashboards and any associated data files. This is where your data models are built and maintained. Connections are defined at the Project level.
* **Workspaces and Documents (The Collaboration Hierarchy):** A Workspace is a collaborative folder for organizing analytical work (e.g., "Q3 Analysis Team"). It contains Documents, which are individual analytical artifacts like notebooks (.malloynb files) or web-based workbooks. This is where analysis and data exploration happen.

A Document in a Workspace can reference and consume data from a Package in a Project. The permission model is designed to make this cross-hierarchy interaction seamless.

## **The Credible Permission Model**

Credible uses a powerful and flexible **two-axis system** to manage access control. This approach separates a user's general capabilities from their specific access rights to a resource. Understanding these two axes is the key to mastering permissions.

### **Part 1: Workspace Roles (Your Capabilities)**

A **Workspace Role** defines your identity and the *maximum* level of capability you have across the entire organization. These roles are tied to your license tier and are typically managed by an Admin.

| Role Name | Key Capabilities & Purpose |
| :---- | :---- |
| **Admin** | **Manages the organization.** Can manage users, groups, billing, and all organization-wide settings. Inherits Owner permissions on all resources. |
| **Editor** | **Creates and modifies content.** Can create new projects, packages, workspaces, and documents. Can edit and publish any resource they have Editor permission on. |
| **Explorer** | **Inspects and analyzes content.** Can view the source code of models and notebooks, and can duplicate content for their own analysis. Cannot edit original resources. |
| **Consumer** | **Interacts with published content.** Can view and interact with published applications and dashboards. Can query published models via the MCP. Cannot see underlying source code or logic. |

### **Part 2: Resource Permissions (What You Can Do)**

A **Resource Permission** is a granular access level granted on a *specific* item (like a Project, Workspace, Package, or Document). This is how you give colleagues access to your work.

| Permission | Capability |
| :---- | :---- |
| **Owner** | **Full control.** Has all Editor permissions, plus the ability to manage sharing, transfer ownership, and delete the resource. |
| **Editor** | **Can modify content.** Can edit the resource, run code, and publish new versions. Can share the resource with others. |
| **Explorer** | **Can view source and duplicate.** Can view the underlying source code (e.g., Malloy models, notebook cells) and duplicate the resource for their own use. |
| **Consumer** | **Can consume published versions only.** Can interact with a published document in the UI or query a published model via the MCP. Cannot see source code. |

## **Core Principles in Action**

These two axes work together based on a few simple, powerful rules.

#### **1\. The Permission Ceiling**

A user's **Workspace Role** always acts as a ceiling on the permissions they can have. For example, if you grant Editor permission on a document to a user with a Consumer Workspace Role, their effective permission is automatically downgraded to Consumer. This is a critical security feature.

#### **2\. Additive Permissions**

When a user is granted access from multiple sources (e.g., Consumer access as part of a team and Editor access as an individual), their effective permission is the **most permissive** of all the grants. In this case, their permission on the resource would be Editor.

#### **3\. Ownership and Deletion**

Each resource has a single Owner who has ultimate control. While Editors can modify content, only the Owner (or a system Admin) can perform irreversible actions like deleting the resource or transferring ownership. When a user is deactivated, ownership of their resources is transferred to an Admin to prevent content from being orphaned.

## **Key Features and Scenarios**

Here’s how this permission model applies to common tasks and workflows.

### **Connection Access: The Model-to-Database Boundary**

Since connections are defined at the Project level, a user's role dictates their ability to use that connection. This creates a clear governance boundary between those who build models and those who consume them.

| Workspace Role | Connection Access | Rationale |
| :---- | :---- | :---- |
| **Admin & Editor** | **Direct SQL Access.** Can run any query against the connection. | Required for data modeling. These "builder" roles must be able to explore the raw database to build and validate semantic models. |
| **Explorer & Consumer** | **Model-Only Access.** Can only run queries that are executed through a Malloy model they have permission to access. | Sandboxes these "consumer" roles within the governed semantic layer. This ensures they use consistent definitions and prevents access to raw data not exposed in the model. |

### **Interaction Modes: Viewing vs. Exploring a Document**

A user's permission on a document dictates how they can interact with its content.

| Resource Permission | Scope of Interaction | Key Differentiating Action |
| :---- | :---- | :---- |
| **Consumer** | Can only interact with the published outputs and pre-defined controls within the shared document. Cannot see or write new queries. | Interacting with filters and buttons. |
| **Explorer** | Can do everything a Consumer can, plus view the underlying source code of all queries and models within the document. | **Can duplicate the document** to create a new, editable copy for ad-hoc exploration. |
| **Editor** | Can do everything an Explorer can, plus directly edit and save changes to the original document. | Editing the original document. |

### **Solving the "Broken Share": Automatic Doc-Scoped Access**

A common frustration is sharing a document from a Workspace, only for the recipient to get an "Access Denied" error because they don't have permission on the underlying Package from a Project. To solve this, Credible uses a feature called **Doc-Scoped Access**.

When you share a resource, a new option ☑ Grant access to underlying models and data sources will be checked by default in the share modal (if needed). 

* **How it Works:** This feature automatically grants the recipient the minimum necessary permission on all upstream dependencies (packages, notebooks, etc.) required for the document to function.  
* **Contextual, Not Permanent:** This access is scoped to the document you shared. The user does not get permanent, direct access to the underlying models. If you revoke their access to the document, their scoped access to the dependencies is revoked simultaneously.  
* **Recursive:** This process is recursive. If a model depends on another model, Doc-Scoped Access traces the entire dependency chain and grants the necessary permissions all the way down.

### **Best Practice: Using Groups for Cross-Hierarchy Access**

Because the Workspace and Project hierarchies are separate, the best way to manage permissions for teams is to use **User Groups**. For example, for a "Marketing Analytics" team, an Admin should:

1. Create a "Marketing Analytics" group.  
2. Grant the group Explorer (or Editor) permission on the "Marketing Analytics" **Workspace**.  
3. Grant the group Explorer (or Editor) permission on the "Marketing Analytics" **Project**.

This ensures that team members have the appropriate access to both the collaborative documents and the governed models they depend on.

### **Programmatic Access (API & MCP)**

Credible provides an MCP endpoint for applications and AI agents to query data. Access is controlled by standard user permissions, not special API keys.

* **Authentication:** An application authenticates using a standard, user-scoped token obtained through the user's normal login process.  
* **Authorization:** For every API call, Credible's backend verifies that the user associated with the token has at least Consumer permission on the specific Package being queried. If they do not, the request is denied.

## **Coming Soon: Fine-Grained Access Controls**

In a future release, Credible will introduce powerful fine-grained access controls directly within the Malloy modeling language. This will allow Editors to implement sophisticated data security policies at the most granular level. These controls will be implemented using annotations in your .malloy model files:

* **Row-Level Security:** Using \#authorize and \#bind annotations, you will be able to filter data dynamically based on the user running the query.  
* **Field-Level Security:** Using Malloy's existing include and except structures, you can create views of a source that expose only a subset of fields to hide sensitive columns.

### **How Permissions Layers Interact**

It is critical to understand how the two permission systems—the **Application Layer** (Workspace Roles, Resource Permissions) and the **Data Layer** (Fine-Grained Controls)—work together.

Think of it like two security checkpoints:

1. **The Application Layer is the first checkpoint.** It determines if you can open a Document at all. If you don't have at least Consumer permission, you can't get in the door.  
2. **The Data Layer is the second checkpoint.** Once you are inside the document, these fine-grained rules determine what specific rows and columns of data you can see when a query runs.

**The Golden Rule:** Data-layer permissions are always evaluated last and take final precedence. This ensures that even with access to an analysis, users can only ever see the data they are explicitly authorized to see at the most granular level.