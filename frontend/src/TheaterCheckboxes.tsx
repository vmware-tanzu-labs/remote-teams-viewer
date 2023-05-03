/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

const jsonToUi: Record<string, string> = {
  East: "Americas Private Sector",
  Federal: "US Public Sector",
};

function isTheaterChecked(theater: string) {
  return localStorage.getItem(theater) === "false" ? false : true;
}

export default function TheaterCheckboxes(props: {
  theaters: string[];
  onActiveTheaterChange: (theaters: string[]) => void;
}) {
  return (
    <div className="theater-checkboxes">
      {props.theaters.map((theater) =>
        "false" === process.env.REACT_APP_DEMO ? (
          <div className="theater-checkbox" key={theater}>
            <label>
              <input
                type="checkbox"
                defaultChecked={isTheaterChecked(theater)}
                onChange={() => {
                  localStorage.setItem(theater, (!isTheaterChecked(theater)).toString());

                  const activeTheaters = props.theaters.filter((theater) => isTheaterChecked(theater));

                  props.onActiveTheaterChange(activeTheaters);
                }}
              />
              {jsonToUi[theater]}
            </label>
          </div>
        ) : (
          <div key={theater}></div>
        ),
      )}
    </div>
  );
}
