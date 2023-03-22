import { OfficeJson } from "../OfficeJson";
import officesJson from "../data/offices.json";

export const getOfficeJSON = async (): Promise<OfficeJson[]> => {
  return officesJson;
};
