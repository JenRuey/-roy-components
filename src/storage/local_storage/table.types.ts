import { Dispatch, SetStateAction } from "react";

export type ToggleStateType = [boolean, Dispatch<SetStateAction<boolean>>];

export interface TableInterface<T> {
  add: (data: Omit<T, "key">) => void;
  selectall: () => Array<T>;
  filter: (attribute: keyof T, filterText: string) => Array<T>;
  delete: (key: string) => void;
}

export interface CommonType {
  key: string;
}
