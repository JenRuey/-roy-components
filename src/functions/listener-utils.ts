import { make_random_id } from "./random-utils";

export interface ListenerType<T> {
  init: (eventhandler: (data: CustomEvent<T>) => void) => void;
  fire: (data: T) => void;
  unmount: () => void;
}

export function createListener<T>(evt?: string): ListenerType<T> {
  let event = evt || Date.now() + "_" + make_random_id(16);

  let _eventhandler: (e: Event) => void = () => {};
  return {
    init: (eventhandler) => {
      _eventhandler = eventhandler as (e: Event) => void;
      window.addEventListener(event, _eventhandler as (e: Event) => void, false);
    },
    fire: (data) => {
      setTimeout(() => {
        let customevent = new CustomEvent<T>(event, { detail: data });
        window.dispatchEvent(customevent);
      }, 200);
    },
    unmount: () => {
      window.removeEventListener(event, _eventhandler, false);
    },
  };
}
