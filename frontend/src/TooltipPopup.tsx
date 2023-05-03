/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import React from "react";
import { Office } from "./Office";
import { Box, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

type Props = {
  office: Office;
};

function getRoleSummary(office: Office) {
  return (
    <>
      {office.roleSummary().map((roleCount) => {
        return (
          <div key={`${office.name}-${roleCount.role}`}>
            <Typography fontSize="small" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">{`${roleCount.count} x `}</Box>
              {roleCount.role}
            </Typography>
          </div>
        );
      })}
    </>
  );
}

function getLevelSummary(office: Office) {
  return (
    <>
      {office.levelSummary().map((summary) => {
        const groups = summary.roleCounts.map((roleCount) => `${roleCount.count} x ${roleCount.role}`);

        return (
          <div key={`${office.name}-${summary.level}`}>
            <Typography fontSize="small" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">
                {summary.level}
              </Box>
              {` - ${groups.join(", ")}`}
            </Typography>
          </div>
        );
      })}
    </>
  );
}

function getNameSummary(office: Office) {
  return (
    <>
      {office.employeeDetails().map((employee) => {
        return (
          <div key={`${office.name}-${employee.key}`}>
            <Typography fontSize="small" component="div">
              <Box fontWeight="fontWeightMedium" display="inline">
                {employee.abbrName}
              </Box>
              {` - ${employee.role}`}
            </Typography>
          </div>
        );
      })}
    </>
  );
}

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="tooltip-content">{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const TooltipPopup: React.FC<Props> = ({ office }: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <h2>{office.name}</h2>
      <div>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Names" {...a11yProps(0)} />
          <Tab label="Roles" {...a11yProps(1)} />
          <Tab label="Levels" {...a11yProps(2)} />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        {getNameSummary(office)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {getRoleSummary(office)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {getLevelSummary(office)}
      </TabPanel>
    </div>
  );
};

function getNameList(office: Office) {
  return (
    <div>
      {office.employeeDetails().map((employee) => {
        return (
          <div key={`${office.name}-${employee.key}`}>
            <b>{`${employee.abbrName}`}</b>
          </div>
        );
      })}
    </div>
  );
}

export const LocationAssociatedNames: React.FC<Props> = ({ office }: Props) => (
  <div className="tooltip" data-testid="icon-locationAssociatedNames">
    <div>{getNameList(office)}</div>
  </div>
);
