export default {
  name: "websiteSettings",
  title: "Website Settings",
  type: "object",
  fields: [
    {
      name: "url",
      title: "Website URL",
      type: "url",
    },

    {
      name: "keywords",
      title: "Website Keywords",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },

    {
      name: "author",
      title: "Website Author",
      type: "string",
    },

    {
      name: "authorUrl",
      title: "Website Author URL",
      type: "url",
    },
  ],
};
