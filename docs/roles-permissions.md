

# **Credible Data: Permissions and Collaboration Guide**

Welcome to the definitive guide on permissions and collaboration in Credible. A core strength of the Credible platform is its ability to facilitate both governed data modeling and flexible, collaborative analysis. This is all underpinned by a robust system for managing access to your data and content.

This guide explains Credible's resource hierarchies, its relationship-based permission model, and how to use these tools to collaborate effectively and securely.

## **The Credible Permission Model: Access Through Relationships**

In Credible, access to all resources is controlled by a powerful permission graph that connects users to the content they need. To make this simple, we talk about these connections using familiar terms for the **relationship** a user has to an object, like admin, modeler, or editor. When you share a Project with a colleague as a modeler, you are creating a direct relationship in the graph that gives them specific capabilities, like creating new packages.

These relationships can be granted directly to a resource or **inherited** from a parent resource. For example, if you are a manager of a Workspace, you automatically inherit contributor permissions on all documents within that workspace, so you don't need to be granted access to each one individually. The sum of your direct and inherited relationships determines what you can do across the platform.

## **Understanding Roles and Resources**

Credible organizes work into two distinct hierarchies, each with its own set of roles tailored to the tasks performed within them.

### **The Project Hierarchy (Project \> Package)**

This is the governance hierarchy where trusted, version-controlled data models are built and maintained. A Package is the core, version-controlled unit containing both the semantic model (.malloy files) and any associated notebooks (.malloynb files) that are deployed together for consumption.

| Role | Key Capabilities & Purpose | Inheritance |
| :---- | :---- | :---- |
| **Admin** | Has full control over the Project. Can manage settings, connections, members, and all packages. | Inherits from the Organization Admin. |
| **Modeler** | The primary "builder" role. Can create and update packages, manage versions, and use the project's data connections to build models. | An Admin of a Project is also a Modeler. |
| **Explorer** | Can run queries against models and view the model source code (e.g., measures, dimensions) to understand their definitions. Cannot edit or publish packages. | A Modeler of a Project is also an Explorer. |

### **The Workspace Hierarchy (Workspace \> Document)**

This is the collaboration hierarchy where analysis and data exploration happen. Permissions are set at the Workspace level and can be overridden for individual Documents.

#### **Workspace Roles**

| Role | Key Capabilities & Purpose | Inheritance |
| :---- | :---- | :---- |
| **Manager** | Has administrative control over the Workspace. Can manage members, settings, and all documents within it. | Inherits from the Organization Admin. |
| **Contributor** | Can create, edit, and delete documents within the workspace. | A Manager of a Workspace is also a Contributor. |
| **Viewer** | Can view the workspace and the documents within it, inheriting Viewer permissions on those documents. | A Contributor of a Workspace is also a Viewer. |

#### **Document Roles**

| Role | Key Capabilities & Purpose | Inheritance |
| :---- | :---- | :---- |
| **Owner** | Has full control over a specific document, including the ability to delete it and transfer ownership. | Assigned to the document's creator. |
| **Editor** | Can modify a document's content, run its code, and share it with others. | Inherited from the Contributor relationship on the parent Workspace. |
| **Viewer** | Can view a document and its source code, and can run the queries within it. Can also duplicate the document to create their own editable copy. | Inherited from the Viewer relationship on the parent Workspace. An Editor of a Document is also a Viewer. |

## **Core Principles in Action**

* **Additive Permissions:** When a user is granted access from multiple sources (e.g., Viewer access to a workspace and Editor access to a specific document within it), their effective permission is the **most permissive** of all the grants.  
* **Ownership and Deletion:** Each document has a single Owner who has ultimate control. While Editors can modify content, only the Owner (or a system Admin) can perform irreversible actions like deleting the resource. When a user is deactivated, ownership of their resources is transferred to an Admin.

## **Key Features and Scenarios**

Here’s how this permission model applies to common tasks and workflows.

### **Connection Access**

Connections are defined at the Project level. Any user who has a relationship to a Package that allows them to query it (e.g., an Explorer) can use the underlying connection to run those queries. The queries are executed through the governed semantic model, which provides a safe and consistent layer for data access.

### **Interaction Modes**

A user's relationship to a document dictates how they can interact with its content.

| Relationship | Scope of Interaction | Key Differentiating Action |
| :---- | :---- | :---- |
| **Viewer** | Can view the document and its source code, run pre-defined queries, and interact with controls. | **Can duplicate the document** to create a new, editable copy for ad-hoc exploration. |
| **Editor** | Can do everything a Viewer can, plus directly edit and save changes to the original document. | Editing the original document. |

### **Solving the "Broken Share": Automatic Doc-Scoped Access**

Credible has a feature to solve the common frustration of sharing a document from a Workspace, only for the recipient to get an "Access Denied" error on the underlying Package from a Project.

When you share a resource, a new option ☑ Grant access to underlying models and data sources will be checked by default in the share modal.

* **How it Works:** This setting automatically grants the recipient the necessary Explorer permission on all upstream dependencies required for the document to function. This is handled via contextual permissions that exist only for that specific request.  
* **Recursive:** This process traces the entire dependency chain. If a model depends on another model, Doc-Scoped Access grants the necessary permissions all the way down.

### **Using Groups to Manage Access**

Because the Workspace and Project hierarchies are separate, you can use **User Groups** to efficiently manage team permissions. For example, for a "Marketing Analytics" team, an Admin might set up the following:

1. Create a "Marketing Analytics" group and add all team members.  
2. Make the team lead the Manager of the "Marketing Analytics" **Workspace**.  
3. Make the "Marketing Analytics" group Contributors to the Workspace, allowing everyone to create and edit documents.  
4. Make the "Marketing Analytics" group Modelers or Explorers on the "Marketing Analytics" **Project**, depending on their roles.

### **Managing Discoverability**

To help users find valuable data without compromising security, Package owners can control whether their packages can be discovered by users who don't have access. In a Package's settings, you will find a toggle: **"Make discoverable to users without access."**

* **Default (OFF):** The package is completely invisible to any user who has not been granted at least an Explorer relationship.  
* **When turned ON:** This feature helps break down data silos and encourages the use of governed assets.  
  * **Anti-Duplication Scenario:** An analyst can search for "churn" and find a certified, governed Package owned by another team, preventing them from rebuilding the same logic from scratch.  
  * **AI Agent Scenario:** An AI agent can discover a relevant Package that a user doesn't have access to. Instead of failing, it can prompt the user: "I found a model that can answer this. Would you like to request access?"

### **Coming Soon: Fine-Grained Access Controls**

In a future release, Credible will introduce powerful fine-grained access controls directly within the Malloy modeling language. This will allow Modelers to implement sophisticated data security policies at the most granular level. These controls will be implemented using annotations in your .malloy model files:

* **Row-Level Security:** Using \#authorize and \#bind annotations, you will be able to filter data dynamically based on the user running the query.  
* **Field-Level Security:** Using Malloy's existing include and except structures, you can create views of a source that expose only a subset of fields to hide sensitive columns.

### **How Permissions Layers Interact**

It is critical to understand how the two permission systems—the **Application Layer** (the relationships like editor or explorer) and the **Data Layer** (Fine-Grained Controls)—work together.

Think of it like two security checkpoints:

1. **The Application Layer is the first checkpoint.** It determines if you can open a Document at all.  
2. **The Data Layer is the second checkpoint.** Once you are inside the document, these fine-grained rules determine what specific rows and columns of data you can see when a query runs.

**The Golden Rule:** Data-layer permissions are always evaluated last and take final precedence. This ensures that even with access to an analysis, users can only ever see the data they are explicitly authorized to see.