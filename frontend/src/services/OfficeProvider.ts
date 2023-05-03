/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import { OfficeJson } from "../OfficeJson";
import officesJson from "../data/offices.json";

export const getOfficeJSON = async (): Promise<OfficeJson[]> => {
  return officesJson;
};
