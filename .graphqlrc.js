require("dotenv").config({ path: "./.env.local" });

module.exports = {
  schema: [
    {
      "https://graphql.datocms.com": {
        headers: {
          Authorization: `Bearer ${process.env.DATO_CMS_TOKEN}`,
        },
      },
    },
  ],

  // Include every .graphql file that might define or import a fragment
  documents: "./graphql/**/*.graphql",

  generates: {
    // local introspection schema (so the LSP can use it)
    "graphql/schema.json": {
      plugins: ["introspection"],
    },

    // generated TS types + typed documents
    "graphql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        documentMode: "documentNode",
        useTypeImports: true,
        fragmentMasking: true,
        strictScalars: true,
        enumsAsTypes: true,
        scalars: {
          BooleanType: "boolean",
          CustomData: "Record<string, unknown>",
          Date: "string",
          DateTime: "string",
          FloatType: "number",
          IntType: "number",
          ItemId: "string",
          JsonField: "unknown",
          MetaTagAttributes: "Record<string, string>",
          UploadId: "string",
        },
      },
    },
  },
};
