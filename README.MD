# To use @roy1997/components CSS style

```tsx
import "@roy1997/components/dist/index.cjs.css";
```

###

##

# Components

## Loading

```tsx
// SpinnerBox

import { SpinnerBox } from "@roy1997/components";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  return <div className="App">{loading && <SpinnerBox />}</div>;
}
```

## popup

```tsx
// Setup for [RYAlert, RYModal]
import { RYAlert, RYModal } from "@roy1997/components";

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="App">
      <RYAlert.Container />
      <RYModal.Container />
    </div>
  );
}
```

```tsx
// trigger for RYAlert
import { RYAlert } from "@roy1997/components";

function Component() {
  const onAction = () => {
    RYAlert.trigger({ message: "Alert Content.", buttons: [{ title: "Noted", theme: "primary", onClick: () => {} }] });
  };
}
```

```tsx
// trigger for RYModal
import { RYModal } from "@roy1997/components";
import { Button, Modal } from "react-bootstrap";

function Component() {
  const onAction = () => {
    RYModal.trigger({
      title: "Add New Group",
      content: (close) => (
        <>
          <Modal.Body>{"Hello World!"}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={close}>
              {"Hi there!"}
            </Button>
          </Modal.Footer>
        </>
      ),
    });
  };
}
```

## Others

```tsx

```

###

##

# functions

## listener-utils

createListener< YourContentType > ( YourCustomEventName )

Return Type :

- init: (eventhandler: (data: CustomEvent<T>) => void) => void;
- fire: (data: T) => void;
- unmount: () => void;

## misc-utils

copyTextToClipboard ( YourTextToBeCopied )

## number-utils

ordinal_suffix_of ( YourNumber )

## random-utils

make_random_id ( YourPreferredIDLength )

###

##

# storage

## local_storage

```ts
import { CommonType, createTable, TableInterface, ToggleStateType } from "@roy1997/components";

//create table

const tablename = "tbl-example";

export interface ExampleType extends CommonType {
  name: string;
}

export const exampletbl = (toggleState?: ToggleStateType): TableInterface<ExampleType> => createTable<ExampleType>(tablename, toggleState);

//create storage index

interface StorageInitInterface {
  example: TableInterface<ExampleType>;
}

export function useStorage(toggleState?: ToggleStateType): StorageInitInterface {
  return { example: exampletbl(toggleState) };
}
```

```tsx
// access storage
import { useState } from "react";
import { useStorage } from "./tables";

function App() {
  const trigPoint = useState<boolean>(false);
  const local_db = useStorage(trigPoint);

  //   add: (data: Omit<T, "key">) => void;
  //   selectall: () => Array<T>;
  //   filter: (attribute: keyof T, filterText: string) => Array<T>;
  //   delete: (key: string) => void;
  local_db.exmaple.add({ name: "data" });
}
```
