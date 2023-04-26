# Remote Teams Viewer

## About The Project
---
Remote Teams Viewer is published as an open source project to help you and your organization build healthier and more effective teams. It was originally developed by VMware Tanzu Labs to help create more effective remote teams. Over the course of the pandemic and shifting towards a remote-first world, Tanzu Labs found that teams are healthier and more effective when team members are from the same or adjacent timezones. Teams with members spread across more than two timzones tend to be less healthy and less effective. This product helps managers to find and visualize where and in what timezones do product managers, developers, and designers reside. By being able to visualize the individual contributors on a map, it enables managers to assemble teams within the ideal one or two timezone spread for healthier and more effective teams.

Read more about the VMware Tanzu Labs findings of remote working in the [blog post](https://tanzu.vmware.com/content/blog/revamping-remote-and-distributed-work-at-vmware-tanzu-labs).


## How To Use

---
You can download the project and deploy an instance to an environment of your choice. Once the application is deployed and is accessible via your browser, you can:
1.  Download the CSV template file
2.  Fill out the CSV file with your team members
3.  Upload the CSV file to the application via the UI
4.  Use the filters and search box on the UI to make have conversations and make decisions around healthier and more effective teams



## Setup
---

## Building Static Data

### usaTimezones json
- Timezone data comes from [Cartography Vectors Website](https://cartographyvectors.com/search?q=timezone)
- Original_USA_Timezones - contains the polygon coordinates for the timezones
- geoJsonEditor - file for adding desired timezone, run this to generate geojson
1. run geoJsonEditor and copy output file to frontend/src/data

## Running Application
1. ```cd parser && npm i && npm run compile```
2. ```cd frontend && npm i```

## Updating

Run `npm run update-dependencies`.
