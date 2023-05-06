export const beautify = (s: any) => {
  //xoa "
  s = s.replaceAll('"', "");

  //xoa '
  s = s.replaceAll("'", "");

  s = s.trim();

  return s;
};
