export class ListedResp<ValueType> {
  values: ValueType[];

  constructor(values: ValueType[]) {
    this.values = values;
  }
}
