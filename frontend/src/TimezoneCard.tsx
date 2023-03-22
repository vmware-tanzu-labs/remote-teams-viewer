import React from "react";
import "./App.css";
import { Office, RoleCount } from "./Office";
import _ from "lodash";

type Props = {
  timezone: string;
  offices: Office[];
};

export const ROLE_COLUMN_HEADERS = ["Des", "Eng", "PM"];

export const TimezoneCard: React.FC<Props> = (Props) => {
  const getRoleSummaries = () => {
    const roleCounts = Props.offices.map((o) => o.roleSummary()).flatMap((o) => o);

    return ROLE_COLUMN_HEADERS.map((header) => {
      const personsWithRole = _(roleCounts).filter((person) => person.role.toLowerCase() === header.toLowerCase());
      return new RoleCount(header, personsWithRole.sumBy("count"));
    });
  };

  return (
    <div className="timezone-card">
      <h4 className="timezone-card-title">{Props.timezone}</h4>
      <table className="timezone-card-table" aria-label={Props.timezone}>
        <tbody>
          <tr>
            {getRoleSummaries().map((roleCount) => (
              <th key={roleCount.role}>{roleCount.role}</th>
            ))}
          </tr>

          <tr>
            {getRoleSummaries().map((roleCount) =>
              false ? (
                <td key={`${roleCount.role} ${roleCount.count}`}>{roleCount.count}</td>
              ) : (
                <td key={`${roleCount.role} ${roleCount.count}`}>0</td>
              ),
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
