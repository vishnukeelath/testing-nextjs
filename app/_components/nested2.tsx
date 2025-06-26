import { cachedGetTxt } from "../_actions/actions";

export const Nested2 = async () => {
  const txtdata = await cachedGetTxt();
  console.log("home filedata 3", txtdata);
  return <div></div>;
};
