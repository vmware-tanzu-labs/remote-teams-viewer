# Contributing to remote-teams-viewer

We welcome contributions from the community and first want to thank you for taking the time to contribute!

Please familiarize yourself with the [Code of Conduct](https://github.com/vmware/.github/blob/main/CODE_OF_CONDUCT.md) before contributing.

Before you start working with remote-teams-viewer, please read our [Developer Certificate of Origin](https://cla.vmware.com/dco). All contributions to this repository must be signed as described on that page. Your signature certifies that you wrote the patch or have the right to pass it on as an open-source patch.

## Ways to contribute

We welcome many different types of contributions and not all of them need a Pull request. Contributions may include:

* New features and proposals
* Documentation
* Bug fixes
* Issue Triage
* Answering questions and giving feedback
* Helping to onboard new contributors
* Other related activities

## Getting started

### Building Static Data

#### usaTimezones json
- Timezone data comes from [Cartography Vectors Website](https://cartographyvectors.com/search?q=timezone)
- Original_USA_Timezones - contains the polygon coordinates for the timezones
- geoJsonEditor - file for adding desired timezone, run this to generate geojson
1. run geoJsonEditor and copy output file to frontend/src/data

### Running Application
1. ```cd parser && npm i && npm run compile```
2. ```cd frontend && npm i```

### Updating

Run `npm run update-dependencies`.


## Contribution Flow

This is a rough outline of what a contributor's workflow looks like:

* Make a fork of the repository within your GitHub account
* Create a topic branch in your fork from where you want to base your work
* Make commits of logical units
* Make sure your commit messages are with the proper format, quality and descriptiveness (see below)
* Push your changes to the topic branch in your fork
* Create a pull request containing that commit

We follow the GitHub workflow and you can find more details on the [GitHub flow documentation](https://docs.github.com/en/get-started/quickstart/github-flow).

### Pull Request Checklist

Before submitting your pull request, we advise you to use the following:

1. Check if your code changes will pass both code linting checks and unit tests.
2. Ensure your commit messages are descriptive. We follow the conventions on [How to Write a Git Commit Message](http://chris.beams.io/posts/git-commit/). Be sure to include any related GitHub issue references in the commit message. See [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) for referencing issues and commits.
3. Check the commits and commits messages and ensure they are free from typos.

## Reporting Bugs and Creating Issues

For specifics on what to include in your report, please follow the guidelines in the issue and pull request templates when available.

### Bug Template
**Steps to reproduce**
1. Enter steps
2. In order
3. To reproduce
4. The issue

**Expected**

Enter the expected result or behavior

**Actual**

Enter the actual result or behavior currently observed


### Feature Template
**As personaName**

**I want** (to do something)

**So that** (I can achieve something)

**Acceptance Criteria**
```gherkin
Scenario: Add a gherkin for each scenario
Given (some precondition)
When (something is done)
Then (something happens)
```

## Ask for Help

The best way to reach us with a question when contributing is to ask on the original GitHub issue.
