import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { abbrName, EmployeeJson } from "./EmployeeJson";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { FilterOptionsState, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  employees: EmployeeJson[];
  onFilterChange: (employees: EmployeeJson[]) => void;
};

export default function EmployeeFilter({ employees, onFilterChange }: Props) {
  const filterAbbNames = (options: EmployeeJson[], state: FilterOptionsState<EmployeeJson>) =>
    state.inputValue.length > 0
      ? options.filter((o) => abbrName(o).match(new RegExp(state.inputValue, "i")))
      : options.filter((o) => abbrName(o));

  return (
    <Autocomplete
      data-testid="employee-autocomplete"
      multiple
      filterSelectedOptions={true}
      filterOptions={filterAbbNames}
      id="employee-filter"
      options={employees}
      limitTags={10}
      fullWidth={true}
      onChange={(event, value) => onFilterChange(value)}
      getOptionLabel={abbrName}
      renderTags={(value: readonly EmployeeJson[], getTagProps) =>
        value.map((option: EmployeeJson, index: number) => (
          <Chip variant="outlined" label={abbrName(option)} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Search Employees"
            placeholder=""
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "#49AFD9" }} />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        );
      }}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(abbrName(option), inputValue, { insideWords: true });
        const parts = parse(abbrName(option), matches);

        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
}
