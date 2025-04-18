# MS2 Quick Start Package

This repo contains a stub for the `ms2-quick-start` package (just the [publisher.json](publisher.json) file). The steps below provide an intro to using the MS2 developer tools to build a semantic model, develop a notebook data story, and publish the package to the MS2 platform for deployment.

## Prerequisites

Prior to starting this guide, you'll need to have an MS2 admin set up an organization for you to use on the MS2 platform. Additionally, you'll need to get the .vsix file that is used to install the MS2 VS Code extension.

The MS2 experience is built around the open-source semantic modeling language [Malloy](https://www.malloydata.dev/). The MS2 developer tools will assist you as you write Malloy code, but it's still helpful to have a basic understanding of the language. The [Malloy documentation](https://docs.malloydata.dev/documentation/) provides a good introduction and serves as a great reference resource.

Install the MS2 CLI (this requirement will be removed soon):

```bash
npm i -g ms2pm
```

*NOTE: if you've used the MS2 CLI before, run `ms2pm logout` to clear any residual state.*

## Install the MS2 VS Code Extension (VS Code or Cursor)

1. Open VS Code and navigate to the Extensions view (Command+Shift+X).
2. Drag the extension ".vsix" file onto the Extensions view.

## Building a Package

Start by cloning this repo on your local machine:

```bash
git clone https://github.com/ms2data/ms2-quick-start.git
```

Then open the folder in VS Code or Cursor.

### MS2 Login

Open the MS2 panel in the primary sidebar and click "Sign In". You will have to click "Allow" and then "Open" to get redirected to a web page where you can log in with your username and password or a Google account.

*NOTE: be sure to log in with an email address that matches what you provided the MS2 admin when they set up your organization.*

After your login shows, click where it says "No environment found" and then select the "ms2-quick-start" environment. This will load the connections needed for this quick start guide.

### Create a Semantic Model

In the file view, create and open a new file called "ecommerce.malloy".


"A model of our ecommerce data that makes it easy to analyze sales trends across different dimensions."
