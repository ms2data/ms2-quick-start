# MS2 Quick Start Package

This repo contains a stub for the `ms2-quick-start` package (just the [publisher.json](publisher.json) file). The steps below provide an intro to using the MS2 developer tools to build a semantic model, develop a notebook data story, and publish the package to the MS2 platform for deployment.

## Prerequisites

Prior to starting this guide, you'll need to have an MS2 admin set up an organization for you to use on the MS2 platform.

The MS2 experience is built around the open-source semantic modeling language [Malloy](https://www.malloydata.dev/). The MS2 developer tools will assist you as you write Malloy code, but it's still helpful to have a basic understanding of the language. The [Malloy documentation](https://docs.malloydata.dev/documentation/) provides a good introduction and serves as a great reference resource.

## Install the MS2 VS Code Extension

1. VS Code and navigate to the Extensions view (Command+Shift+X).
2. Search for "MS2" and install the extension.
3. [Temporary] Find the Malloy extension and click "Switch to Pre-Release Version".

*NOTE: the extension mostly works with Cursor, but it has not been fully tested in Cursor and some features may not work.*

## Building a Package

Start by cloning this repo on your local machine:

```bash
git clone https://github.com/ms2data/ms2-quick-start.git
```

Then open the folder in VS Code.

### MS2 Login

Open the Explorer panel in the primary sidebar and expand the "MS2 Service" section. Click "Sign In" and then click "+ Add new organization" and write in the name of the organization that was set up for you. Then you will have to click "Allow" and then "Open" to get redirected to a web page where you can log in with your username and password or a Google account. When redirected back to VS Code, you will be prompted to select a project and you should choose "ms2-quick-start". This will load the connections needed for this quick start guide. Later you can change the project by clicking on the project name in the "MS2 Service" section.

*NOTE: be sure to log in with the email address that you provided the MS2 admin when they set up your organization.*

### Create a Semantic Model

In the file view, create and open a new file called `ecommerce.malloy`. Open the command palette (Command+Shift+P) and select "MS2: Suggest Semantic Model". You will be prompted to enter a description for the semantic model. You can try something like:

> Build a model of ecommerce data that makes it easy to analyze sales trends across different dimensions

After around 30s the semantic model will show in the editor. The system fixes most compile errors, but if there are any errors left, you'll want to fix them manually.

In a normal workflow, you would review the generated model and adjust it to be more applicable to your needs and the underlying data. For the purposes of this demo, you can leave the model as is and move on to the next step.

**NOTE: it's worth noting that the quality of query generation is directly related to the quality of the semantic model. So for real-world use cases you will want to build the most complete and accurate model possible.**

When editing a semantic model, you will see some code suggestions coming from the MS2 extension which you can tab to accept. You can also prompt our system to generate code or modify selected code by using the "ctrl+cmd+i" keyboard shortcut and providing directions at the top of the window.

*NOTE: some of the inline suggestions may also come from Copilot if you have that enabled and it can be hard to tell which service provided the suggestion.*

### Develop a Notebook Data Story

In the file view, create and open a new file called `sales_performance.malloynb`. Then open the command palette and select "MS2: Suggest Analysis Topics". You will be prompted to enter a description for the notebook. You can try something like:

> Explore product sales performance across various dimensions like product category, brand, distribution method, etc.

This command will populate the notebook with a sequence of data analysis topics that can be refined to your liking.

#### Generating Malloy Queries

The last part of the process involves working through the analysis sections in the notebook and building Malloy queries for them. For each analysis block, modify the suggested analysis description so that it reflects the analysis you want to perform. MS2 will use this description to generate a relevant Malloy query.

When the description is satisfactory for a given analysis, click the "Generate" button in the "MS2" section of the code cell. A block of Malloy code will show in the cell after about 10-15s. Fix errors if there are any and then click the "Run" text above the query to see the results.

## Integrating Analyses into a Data App

In this section, we are going to take the data story we built and make it widely available online by publishing the package to the MS2 platform and embedding the analyses in a sample data app.

### Publish the Package

In the file view, open the `publisher.json` file. Manually edit the version to be `0.0.1`. Next locate and expand the "MS2 Local Packages" section in the Explorer panel in the primary sidebar. This sections shows all available publisher packages within the root folder of the workspace. In this case there will only be one package which is the "ms2-quick-start" package. Expand this entry and then click the "Publish" button and confirm by clicking "Yes".

You can verify that it's published by checking the "MS2 Service" section in the Explorer panel in the primary sidebar. First refresh the panel by clicking the refresh button and then expand "Packages" and "ms2-quick-start". You should see the new version show in the list of versions.

You can also view the published package via the MS2 online portal. Just replace `<organization_name>` with the name of your organization in the URL below:

```
https://<organization_name>.staging-admin.ms2.co/ms2-quick-start/ms2-quick-start/latest/
```

### Getting the Embed Code

Once the package is published, any analysis cell from the notebook data story can be easily embedded into a data app. To get the embed code for a given cell, just click on the "Embed" button in the "MS2" section of the cell. This will open a dialog with the embed code and you can copy it from there.

### Running a Sample Data App

Coming soon.