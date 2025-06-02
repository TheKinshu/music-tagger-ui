import * as path from 'path';
import * as fs from 'fs';
import { camelCase } from 'lodash';
import { generateApi } from 'swagger-typescript-api';

const outDir = path.resolve(process.cwd(), './src/api');

function lowercaseFirstLetter(str: string) {
  if (str.length === 0) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
}

generateApi({
  input: 'swagger.json',
  output: outDir,
  httpClientType: 'axios',
  modular: true,
  cleanOutput: false,
  sortTypes: true,
  codeGenConstructs: (constructs) => ({
    ...constructs,
    // EnumFieldsWrapper: (contents) => {
    //   return [...contents].map(contents, ({ key, value }: { key: string; value: string }): string => `  ${key} = ${value}`).join(',\n');
    // },
  }),
  primitiveTypeConstructs: (constructs) => ({
    ...constructs,
    string: {
      $default: (schema) => {
        if (schema.xNullable) {
          return 'string | null';
        }
        return 'string';
      },
      'date-time': (schema) => {
        if (schema.xNullable) {
          return 'string | null';
        }
        return 'string';
      },
    },
  }),
  hooks: {
    onCreateRouteName(routeNameInfo) {
      return {
        ...routeNameInfo,
        usage: lowercaseFirstLetter(routeNameInfo.usage.replace(/^(.*)ApiV1(.*)(Post|Get)$/, '$2')),
        original: lowercaseFirstLetter(routeNameInfo.original.replace(/^(.*)ApiV1(.*)(Post|Get)$/, '$2')),
      };
    },
    onParseSchema: (schema, parsedSchema) => {
      if (schema.type === 'object' && parsedSchema.type === 'object') {
        parsedSchema.content = [
          ...parsedSchema.content.map((obj: any) => {
            const originalName = obj.name;
            const camelCasedName = camelCase(obj.name);
            return {
              ...obj,
              name: camelCasedName,
              field: obj.field.replace(new RegExp(originalName, 'g'), camelCasedName),
            };
          }),
        ];
      }
      return parsedSchema;
    },
  },
})
  .then(({ files }) => {
    for (const { fileName, fileExtension } of files) {
      if (fileName === 'Health') {
        fs.rmSync(`${outDir}/${fileName}${fileExtension}`);
      }
    }
  })
  .catch((e) => console.error(e));
