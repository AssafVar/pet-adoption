const petSchema = {
  type: "object",
  properties: {
    type: { type: "string", minLength: 1 },
    name: { type: "string", minLength: 1 },
    height: { type: "string", minLength: 1 },
    weight: { type: "string", minLength: 1 },
    color: { type: "string", minLength: 1 },
    restrictions: { type: "string", minLength: 1 },
    breed: { type: "string", minLength: 1 },
    hypoallergenic: { type: "string", minLength: 1},
    status: { type: "string", minLength: 1 },
    bio: { type: "string"},
    id: { type: "string", minLength: 1 },

  },
  required: [
    "id",
    "type",
    "name",
    "status",
    "height",
    "weight",
    "color",
    "bio",
    "hypoallergenic",
    "breed",
    "restrictions"
  ],
  additionalProperties: false,
};

export default petSchema;
