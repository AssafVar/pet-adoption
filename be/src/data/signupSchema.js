const signupSchema = {
    type: "object",
    properties: {
      userFirstName: { type: "string",minLength: 1 },
      userLastName: { type: "string" ,minLength: 1},
      userEmail: { type: "string" , format: "email"},
      userPassword: { type: "string" ,minLength: 1},
      userConfirmPassword: { type: "string" ,minLength: 1},
      userPhoneNumber: { type: "string" ,minLength:1 },
      userBio: { type: "string" },
      userId: {type:"string"}

    },
    required: ["userFirstName", "userLastName", "userEmail", "userPassword","userConfirmPassword","userPhoneNumber"],
    additionalProperties: false,
  };

  
  
  export default signupSchema;
  