import { beautify } from "./beautify";

export const stringToArray = (s: string) => {
  //   console.log("s");
  //   console.log(s);

  const arr = s.split(/},{/);
  let res;

  const result: any = [];
  // console.log("arr");
  // console.log(arr);

  if (JSON.stringify(result) === s) return result;

  arr.map((item: any, index: any) => {
    //slice:
    //2 params: giu lai tu a->b-1
    //1 param: giu lai 0->a

    if (index == 0) item = item.slice(2);
    if (index == arr.length - 1) item = item.slice(0, -2);
    // item = item.replaceAll('"', "");
    // console.log(item);
    res = item.split(",").reduce((res: any, item: any) => {
      const temp = item.split(":");
      let key = temp[0];
      key = beautify(key);

      let value = temp[1];
      value = beautify(value);

      const obj: any = {};
      obj[key] = value;

      return { ...res, ...obj };
    }, {});

    // console.log(res);
    result.push(res);
  });

  return result;
};
