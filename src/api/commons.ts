import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export class ValuesResp<ValueType> {
  values: ValueType[];

  constructor(values: ValueType[]) {
    this.values = values;
  }
}

export function ValuesApiOkResponse(valuesType) {
  return ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ValuesResp) },
        {
          properties: {
            values: {
              type: 'array',
              items: { $ref: getSchemaPath(valuesType) },
            },
          },
        },
      ],
    },
  });
}
