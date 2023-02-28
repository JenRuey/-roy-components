import _ from "lodash";
import { make_random_id } from "../../functions";
import { CommonType, TableInterface, ToggleStateType } from "./table.types";

function generateKey(tbl: string): string {
  let newrandomid = tbl + "_" + Date.now() + "_" + make_random_id(25);
  return newrandomid;
}

const strogename = "tmp-storage";
function retrieveData<T>(tbl: string): Array<T> {
  let tmpStorage = JSON.parse(localStorage.getItem(strogename) || "{}");
  return tmpStorage[tbl] || [];
}
function storeData<T>(tbl: string, newtbl: Array<T>, toggleState?: ToggleStateType): void {
  let tmpStorage = JSON.parse(localStorage.getItem(strogename) || "{}");
  tmpStorage[tbl] = newtbl;
  localStorage.setItem(strogename, JSON.stringify(tmpStorage));
  if (toggleState) toggleState[1](!toggleState[0]);
}

export function createTable<T>(tablename: string, toggleState?: ToggleStateType): TableInterface<T> {
  type TableType = Omit<T, "key"> & CommonType;
  return {
    add: function (data) {
      let tbl = retrieveData<TableType>(tablename);
      tbl.push({ key: generateKey(tablename), ...data });
      storeData<TableType>(tablename, tbl, toggleState);
    },
    selectall: function () {
      let tbl = retrieveData<T>(tablename);
      return tbl;
    },
    filter: function (attribute, filterText) {
      let tbl = retrieveData<T>(tablename);
      return _.filter(tbl, (o) => o[attribute] === filterText);
    },
    delete: function (key) {
      let tbl = retrieveData<TableType>(tablename);
      let newtbl = _.filter(tbl, (o) => o.key !== key);
      storeData<TableType>(tablename, newtbl, toggleState);
    },
  };
}
