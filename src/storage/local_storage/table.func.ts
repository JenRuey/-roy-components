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
    addall: function (data) {
      let tbl = retrieveData<TableType>(tablename);
      for (let d of data) {
        tbl.push({ ...d, key: generateKey(tablename) });
      }
      storeData<TableType>(tablename, tbl, toggleState);
    },
    selectall: function () {
      let tbl = retrieveData<T>(tablename);
      return tbl;
    },
    filterall: function (data) {
      let tbl = retrieveData<T>(tablename);
      return _.filter(tbl, (o) => data.some((d) => o[d.attribute] === d.text));
    },
    deleteall: function (keys) {
      let tbl = retrieveData<TableType>(tablename);
      let newtbl = _.filter(tbl, (o) => !keys.some((k) => o.key === k));
      storeData<TableType>(tablename, newtbl, toggleState);
    },
    updateitems: function (data) {
      let tbl = retrieveData<TableType>(tablename);
      for (let d of data) {
        let idx = _.findIndex(tbl, (o) => o.key === d.key);
        if (idx === -1) {
          tbl.push({ ...d, key: generateKey(tablename) });
        } else {
          tbl[idx] = d;
        }
      }
      storeData<TableType>(tablename, tbl, toggleState);
    },
  };
}
