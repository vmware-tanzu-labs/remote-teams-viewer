/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import { Office } from "./Office";
import React, { useState } from "react";
import { TimezoneCard } from "./TimezoneCard";
import "./App.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Props = {
  offices: Office[];
};

export const TimezoneCards: React.FC<Props> = (Props) => {
  const [title, setTitle] = useState("Close");

  const updateTitle = () => {
    setTitle(title === "Close" ? "Open" : "Close");
  };

  const timezones: { zone: string }[] = [
    { zone: "Pacific" },
    { zone: "Mountain" },
    { zone: "Central" },
    { zone: "Eastern" },
  ];
  return (
    <div className="timezone-container">
      <div className="timezone-text">Time Zones:</div>
      {timezones.map((timezone) => (
        <TimezoneCard
          key={timezone.zone}
          offices={Props.offices.filter((o) => o.timezone === timezone.zone)}
          timezone={timezone.zone}
          title={title}
        />
      ))}
      <div className="timezone-text">
        <a
          onClick={updateTitle}
          style={{ color: "#49AFD9", textDecoration: "none" }}
          data-toggle="collapse"
          href="#collapsed"
          role="button"
          aria-expanded="false"
          aria-controls="collapsed"
        >
          <div style={{ display: "flex" }}>
            <div className="text-uppercase">{title === "Open" ? "Close" : "Open"}</div>
            <div>{title === "Open" ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</div>
          </div>
        </a>
      </div>
    </div>
  );
};
