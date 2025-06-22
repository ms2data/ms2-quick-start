# Getting Started with the MS2 CLI

The MS2 Command Line Interface (CLI) offers full control over your semantic modeling resources, matching the capabilities of the MS2 Portal. It’s built for data engineers and DevOps professionals who prefer to automate workflows and integrate directly with scripts and CI/CD pipelines.

## Installation

Before installing the CLI, ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

Install the MS2 CLI globally:

```bash
npm i -g ms2pm
```

## Authentication and Project Setup

Log in to your MS2 organization and set the default project:

```bash
ms2pm login demo
ms2pm set-project malloy-samples
```

You must authenticate with an organization before accessing any resources.

## Basic Package Operations

### List Packages in a Project

```bash
ms2pm ls /
```

Example output:

```json
[
  {
    "name": "ecommerce",
    "latestVersion": "1.0.0",
    "description": "Example Transactional data for an eCommerce business"
  },
  {
    "name": "imdb",
    "latestVersion": "1.0.3",
    "description": "IMDb makes data available for download via their website. Used with permission..."
  }
]
```

### List Versions in a Package

```bash
ms2pm ls /imdb
```

Example output:

```json
[
  {
    "id": "1.0.3",
    "createTimestamp": "2025-03-19T14:57:42.743Z"
  }
]
```

### Publish a New Version

Navigate to the local directory containing your package (e.g., `imdb`) and run:

```bash
cd imdb
ms2pm publish
```

Sample output:

```json
{
  "name": "imdb",
  "latestVersion": "1.0.4",
  "description": "IMDb makes data available for download via their website. Used with permission..."
}
```

You can verify the updated versions with:

```bash
ms2pm ls /imdb
```

## Full CLI Reference

The CLI mirrors most MS2 Portal functionality including:

- Managing organizations, projects, packages, and connections
- Listing, publishing, and deleting resources
- Versioning and access control

You can explore all commands using:

```bash
ms2pm --help
```

### CLI Command Summary

```text
Usage: ms2pm [options] [command]

Options:
  -V, --version                                      output the version number
  -h, --help                                         display help for command

Commands:
  login <organizationName>       Login into MS2 service
  logout                         Resets MS2 service credentials
  set-project <projectName>      Set ms2pm's default project
  create-project <projectName>   Create a new project
  delete-project <projectName>   Delete a project
  list-projects                  List all projects
  create-connections <file>      Create a new connection
  list-connections               List all connections
  delete-connection <name>       Delete a connection
  ls <path>                      List the resources at the specified path
  rm <path>                      Delete a resource
  publish                        Publish the current package
```

## Tip

The CLI is ideal for scripting, CI/CD pipelines, or power users who prefer the keyboard over a GUI.

## See Also

[MS2 Portal Getting Started Guide](./portal.md).
