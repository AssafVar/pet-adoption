const loginSchema = {
    type: "object",
    properties: {
      userEmail: { type: "string", minLength: 1 },
      userPassword: { type: "string", minLength: 1 },
    },
    required: ["userEmail", "userPassword"],
    additionalProperties: false,
  };

  export default loginSchema;