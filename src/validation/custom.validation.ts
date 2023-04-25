const objectId = (value: any, helpers: any) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.error("must be a valid mongo id");
  }
  return value;
};
export const customValidations = {
  objectId,
};
