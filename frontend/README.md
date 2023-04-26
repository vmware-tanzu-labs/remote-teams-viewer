# Remote Teams Viewer
---

### Miro Board: [Link](https://miro.com/app/board/uXjVOwRWcxk=/)

### Miro Board (Eng): [Link](https://miro.com/app/board/uXjVOqY2_LA=/)

### Pivotal Tracker: [Link](https://www.pivotaltracker.com/n/projects/2579265)

## Setup

---

### Git Duet for Pairing / Mobbing

_This is required for the git hooks to work_

[Homepage](https://github.com/git-duet/git-duet)

1. Git Config:

```
# GIT DUET
export GIT_DUET_GLOBAL=1
export GIT_DUET_CO_AUTHORED_BY=1
export GIT_DUET_ROTATE_AUTHOR=1
```

2. Restart terminal and run `git init` on repo

## Building Static Data
### Employee json
1. obtain spreadsheet of Labs employees from Mik Freedman ([mfreedman@vmware.com](mfreedman@vmware.com))
2. export spreadsheet to csv format
3. compile base parser ```cd parser && npm run compile```
4. run command from parser-cli application folder:
```
npm run start -- -s -f ./remote-teams-viewer.csv -o ../frontend/src/data/employees.json
```

### usaTimezones json
- Timezone data comes from [Cartography Vectors Website](https://cartographyvectors.com/search?q=timezone)
- Original_USA_Timezones - contains the polygon coordinates for the timezones
- geoJsonEditor - file for adding desired timezone, run this to generate geojson
1. run geoJsonEditor and copy output file to frontend/src/data

## Basic Application Setup
1. ```cd parser && npm i && npm run compile```
2. ```cd frontend && npm i```

## Setting up in Intellij
1. clone project
2. complete application setup above
3. add frontend, parser, parser-cli as modules under project structure (should detect as web module)
   1. intellij should now recognize test files


## Updating

Run `npm run update-dependencies`.

## Design Choices

=======
### Updating parser dependency in package-lock.json

>>>>>>> frontend/README.md
`npm link ../parser --save` will create the necessary reference in package-lock.json

## Design Choices
=======

---

### Miro Board: [Link](https://miro.com/app/board/uXjVOwRWcxk=/)

### Miro Board (Eng): [Link](https://miro.com/app/board/uXjVOqY2_LA=/)

### Pivotal Tracker: [Link](https://www.pivotaltracker.com/n/projects/2579265)

## Setup

---

### Git Duet for Pairing / Mobbing

_This is required for the git hooks to work_

[Homepage](https://github.com/git-duet/git-duet)

1. Git Config:

```
# GIT DUET
export GIT_DUET_GLOBAL=1
export GIT_DUET_CO_AUTHORED_BY=1
export GIT_DUET_ROTATE_AUTHOR=1
```

2. Restart terminal and run `git init` on repo

## Building Static Data
### Employee json
1. obtain spreadsheet of Labs employees from Mik Freedman ([mfreedman@vmware.com](mfreedman@vmware.com))
2. export spreadsheet to csv format
3. compile base parser ```cd parser && npm run compile```
4. run command from parser-cli application folder:
```
npm run start -- -s -f ./remote-teams-viewer.csv -o ../frontend/src/data/employees.json
```

### usaTimezones json
- Timezone data comes from [Cartography Vectors Website](https://cartographyvectors.com/search?q=timezone)
- Original_USA_Timezones - contains the polygon coordinates for the timezones
- geoJsonEditor - file for adding desired timezone, run this to generate geojson
1. run geoJsonEditor and copy output file to frontend/src/data

## Basic Application Setup
1. ```cd parser && npm i && npm run compile```
2. ```cd frontend && npm i```

## Setting up in Intellij
1. clone project
2. complete application setup above
3. add frontend, parser, parser-cli as modules under project structure (should detect as web module)
   1. intellij should now recognize test files


## Updating

Run `npm run update-dependencies`.

### Updating parser dependency in package-lock.json

`npm link ../parser --save` will create the necessary reference in package-lock.json

## Design Choices

>>>>>>> main
---

1. Create React App - to optimize on-boarding. This way anyone can jump into the project. Well documented and get
   started
2. No Backend - Wait for a feature to drive this. Right now data comes from a Google sheet (CSV file can be converted to
   JSON)
3. Typescript - Better documentation, more discoverable, easier to jump on the project, and better autocomplete
4. Git Duet for pairing and mobbing - keep track of who has context on commits
5. Not acceptance environment - right now we have no dedicated PM, so we are dev accepting things and our audience is
   limited,
   so we ship right to prod
6. Husky - auto run CI locally in `pre-push` to have less knowledge transfer around manually doing it

## Deployment

---
We are currently deploying to [ESP](https://confluence.eng.vmware.com/display/EcosystemServicesPlatform/Extensible+Service+Platform+Home),
a managed kubernetes environment deployed on top of DECC. We moved from DECC to take advantage of provisioned data
connectors and auth as a service.

### CI/CD
- Using Gitlab CI/CD to build and deploy
- uses a [kaniko](https://github.com/GoogleContainerTools/kaniko) image to build container
- uses the ESP cli and ESP base image to retrieve authentication for the registry and to push to deployment environments

### ESP
- [ESP dashboard](https://management.esp.eng.vmware.com/service/737)
- for access to dashboard contact [ericha@vmware.com](ericha@vmware.com)
- slack channel: [#esp-assist](https://vmware.slack.com/archives/CQZ7W775Z)
- To add a new member go to [service](https://management.esp.eng.vmware.com/service/737), "Service Owners" tab and 
add a username to the list

