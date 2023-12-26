export const required = {
  value: true,
  message: "This field is required",
};

export const minLength = {
  value: 3,
  message: "This field must be at least 3 characters long",
};

export const emailPattern = {
  value: /\S+@\S+\.\S+/,
  message: "Please enter a valid email",
};

export const lettersOnlyPattern = {
  value: /^[A-Za-z]+$/i,
  message: "Only letters are allowed",
};
