import { Dispatch, SetStateAction } from "react";

export type ToggleStateType = [boolean, Dispatch<SetStateAction<boolean>>];

export interface TableInterface<T> {
  addall: (data: Array<Omit<T, "key">>) => void;
  selectall: () => Array<T>;
  filterall: (data: Array<{ attribute: keyof T; text: string }>) => Array<T>;
  deleteall: (keys: Array<string>) => void;
  updateitems: (data: Array<T & CommonType>) => void;
}
export interface CommonType {
  key: string;
}
