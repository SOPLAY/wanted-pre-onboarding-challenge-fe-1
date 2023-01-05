export const validate = {
  email: (value: string) => /@+\w+\.+/gi.test(value),
  password: (value: string) => /.{8,}/gi.test(value),
};
