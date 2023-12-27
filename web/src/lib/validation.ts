type Validation = {
  message: string;
  value: number | string | boolean | RegExp;
};

export const required: Validation = {
  value: true,
  message: "This field is required",
};

export const minLength: Validation = {
  value: 3,
  message: "This field must be at least 3 characters long",
};

export const emailPattern: Validation = {
  value: /\S+@\S+\.\S+/,
  message: "Please enter a valid email",
};

export const lettersOnlyPattern: Validation = {
  value: /^[A-Za-z]+$/i,
  message: "Only letters are allowed",
};
