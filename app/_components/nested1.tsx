import { cachedGetTxt } from "../_actions/actions";
import { Nested2 } from "./nested2";

export const Nested1 = async () => {
  const txtdata = await cachedGetTxt();
  console.log("home filedata 1", txtdata);
  return <Nested2></Nested2>;
};
