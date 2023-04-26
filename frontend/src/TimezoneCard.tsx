import React from "react";
import "./App.css";
import { Office, RoleCount } from "./Office";
import _ from "lodash";

type Props = {
  timezone: string;
  offices: Office[];
  title: string;
};

export const ROLE_COLUMN_HEADERS = ["Eng", "Des", "PM"];

export const TimezoneCard: React.FC<Props> = (Props) => {
  const getRoleSummaries = () => {
    const roleCounts = Props.offices.map((o) => o.roleSummary()).flatMap((o) => o);

    return ROLE_COLUMN_HEADERS.map((header) => {
      const personsWithRole = _(roleCounts).filter((person) => person.role.toLowerCase() === header.toLowerCase());
      return new RoleCount(header, personsWithRole.sumBy("count"));
    });
  };

  const getTimezoneCardTableClass = () => {
    return "timezone-card-table" + (Props.title === "Close" ? ", collapse" : "");
  };

  return (
    <div className="timezone-card">
      <div className="timezone-card-title">{Props.timezone}</div>
      <hr />
      <table className={getTimezoneCardTableClass()} id="collapsed" aria-label={Props.timezone}>
        <tbody>
          <tr>
            {getRoleSummaries().map((roleCount) => (
              <th key={roleCount.role}>{roleCount.role}</th>
            ))}
          </tr>

          <tr>
            {getRoleSummaries().map((roleCount) =>
              "false" === process.env.REACT_APP_DEMO || localStorage.getItem("fileUploaded") === "true" ? (
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
