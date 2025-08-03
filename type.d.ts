import { Connection } from "mongoose";
declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Connection<Promise> | null;
  };
}
export {};
