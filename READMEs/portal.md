# Getting Started with the MS2 Admin Portal

> [!WARNING]
> Work in progress. James to add screenshots and more details here.

The MS2 Portal provides a browser-based UI to explore and manage your semantic model resources across organizations, projects, and packages.

## Overview

The Portal is organized by a three-level hierarchy:

- **Organizations** → **Projects** → **Packages**

You can navigate this hierarchy from the **left-hand menu**. The **main panel** displays details of the selected resource (organization, project, or package), and the **right-hand menu** contains admin-specific controls relevant to the selected level.

## Organizations

Selecting an organization displays its projects and packages. For example, in the screenshot below, the **demo** organization contains a project called `malloy-samples` and several packages like `auto-recalls` and `bq-ga-sessions`.

![TODO: Organizations Screenshot](./screenshots/organization-view.png)

### Organization-Level Controls

- Create Projects
- Manage Members
- View Admin Analytics (in development)

## User Management

Click **Manage Members** in the right menu to view existing users and their roles or invite new ones.

- **Admins** have full access to all projects and packages.
- **Members** can list projects and may have view/edit rights based on permissions.

![TODO:User Management Screenshot](./screenshots/manage-members.png)

**Note:** You must be a member of an organization to log into the MS2 Portal.

## Admin Analytics (Coming Soon)

This feature will offer insights on:

- **Cost** optimization
- **Performance** monitoring
- **Security** analysis

These analytics will leverage AI-powered experiences to help platform administrators operate efficiently and securely.

## Projects

Selecting a project displays its packages and optionally a project-level README.

![TODO:Project View Screenshot](./screenshots/project-view.png)

### Project-Level Controls

- Share Project
- Delete Project
- Manage Connections

### Sharing Projects

You can share a project with others as:

- **Admins** – can create/delete packages
- **Members** – can view packages

![TODO: Project Sharing Screenshot](./screenshots/share-project.png)

### Connection Management

MS2 allows you to manage connections to various databases per project. Packages reference these connections by name.

Supports:

- Postgres
- BigQuery
- Snowflake
- MySQL
- Presto / Trino

Projects can be aligned with dev/staging/prod environments to restrict access accordingly.

## Packages

Selecting a package displays its manifest, semantic model files, notebooks, README, and embedded databases.

![Package View Screenshot](./screenshots/package-view.png)

### Package-Level Controls

- Share or Delete Package
- View and Manage Versions

### Sharing Packages

Package-level permissions allow more granular access:

- **Editors** – can modify contents
- **Viewers** – read-only access

Users with project-level permissions inherit access at the package level, but this is shown as read-only/grayed out in the UI.

![TODO: Package Sharing Screenshot](./screenshots/share-package.png)

## Package Versioning

All packages are versioned by default.

You can:

- View version history
- Pin a version as the default (`latest`)

Each version can be referenced via API using the version tag.

![TODO:Versioning Screenshot](./screenshots/package-versions.png)

## Exploring Package Contents

A typical MS2 package includes:

- `package.yaml` – manifest file with metadata and dependencies
- `README.md` – optional documentation
- Malloy **model files** – define semantic structure
- Malloy **notebooks** – interactive reports and data stories
- Embedded databases – CSV/Parquet files loaded into DuckDB

## Models

Model files open in the model UI and define reusable sources and extended sources (joins, measures, dimensions, views).

- A **source** = table + semantic metadata
- Promotes modular, reusable logic

![TODO: Model UI Screenshot](./screenshots/model-view.png)

## Notebooks

The notebook UI enables interactive data exploration through semantic models.

- Each cell shows its query and result
- Designed to simplify complex queries and tell data stories

![TODO: Notebook Screenshot](./screenshots/notebook.png)

## Next Steps

1. Log into the MS2 Portal.
2. Select the 'malloy-samples' project.
3. Explore Packages, Notebooks, and Models.

## See Also

For a command line interface, refer to the [MS2 CLI Getting Started Guide](./cli.md).
