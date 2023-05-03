"""
  Copyright 2022-2023 VMware, Inc.
  SPDX-License-Identifier: MIT
"""

# July 25, 2022

"""
    A Python tool to open a GeoJson (or JSON) file
    and cleanup the timezone data given from Cartography
    Vectors.

    Removes the non-continental 48 states, shifts the longitude
    in order for the GeoJson to align with the first map, and
    transforms Timezone ID (TZID) into a more consistent ID.

    Then, writes out a new GeoJSON file.

"""
import json

# Opening JSON file
oldFile = open("./Original_USA_Timezones.json")

# Returns JSON object as a dictionary
data = json.load(oldFile)

new_features = []
unwanted_timezones = [
    "America/Sitka",
    "America/Juneau",
    "America/Anchorage",
    "America/Nome",
    "America/St_Thomas",
    "America/Puerto_Rico",
    "America/Adak",
    "America/Metlakatla",
    "Pacific/Honolulu",
    "America/Yakutat",
]

PST = ["America/Los_Angeles"]
MST = ["America/Phoenix", "America/Boise", "America/Denver"]
CST = ["America/North_Dakota/New_Salem", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/Chicago"]
EST = ["America/Indiana/Vincennes", "America/Indiana/Petersburg", "America/Indiana/Indianapolis", "America/Indiana/Tell_City",
       "America/Indiana/Marengo", "America/Indiana/Knox", "America/Indiana/Vevay",
       "America/New_York", "America/Kentucky/Monticello", "America/Kentucky/Louisville", "America/Indiana/Winamac",
       "America/Detroit", "America/Menominee"]

# Remove unwanted timezones
for feature in data['features']:
    if feature["properties"]["TZID"] not in unwanted_timezones:
        new_features.append(feature)

# Shift GEOJSON longitude
for feature in new_features:
    outer_coords = feature["geometry"]["coordinates"]
    for inner_coords in outer_coords:
        for coord in inner_coords:
            if coord[0] > 180:
                coord[0] -= 360

# Modify GEOJSON styles
for feature in new_features:
    if feature["properties"]["TZID"] in PST:
        feature["properties"]["TZID"] = "America/PST"

    if feature["properties"]["TZID"] in MST:
        feature["properties"]["TZID"] = "America/MST"

    if feature["properties"]["TZID"] in CST:
        feature["properties"]["TZID"] = "America/CST"

    if feature["properties"]["TZID"] in EST:
        feature["properties"]["TZID"] = "America/EST"

# Write new JSON object to file
with open("usaTimezones.json", "w") as newFile:
    json.dump({"Type": "FeatureCollection", "features": new_features}, newFile, ensure_ascii=False, indent=4)

# Close files
oldFile.close()
newFile.close()
