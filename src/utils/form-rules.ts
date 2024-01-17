export const formRules = {
  required: {
    value: true,
    message: "This field required",
  },
  email: {
    value: /\S+@\S+\.\S+/,
    message: "Must email format",
  },
  minNominal: (number: number) => ({
    value: number,
    message: "Must greater than " + number,
  }),
};

export function getVariant(dirty: boolean, error: boolean) {
  if (error) {
    return "primary";
  }
  return !dirty ? "default" : "green";
}
