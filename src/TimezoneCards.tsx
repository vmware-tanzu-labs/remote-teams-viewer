import { Office } from "./Office";
import React from "react";
import { TimezoneCard } from "./TimezoneCard";
import "./App.css";

type Props = {
  offices: Office[];
};

export const TimezoneCards: React.FC<Props> = (Props) => {
  const timezones: { zone: string }[] = [
    { zone: "Pacific" },
    { zone: "Mountain" },
    { zone: "Central" },
    { zone: "Eastern" },
  ];
  return (
    <div className="timezone-container">
      {timezones.map((timezone) => (
        <TimezoneCard
          key={timezone.zone}
          offices={Props.offices.filter((o) => o.timezone === timezone.zone)}
          timezone={timezone.zone}
        />
      ))}
    </div>
  );
};
