/*tslint:disable:no-bitwise*/
const emptyGuidString: string = '00000000-0000-0000-0000-000000000000';
export class Guid {

  private value: string = emptyGuidString;
  static validRegex: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  static newGuid(id: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'): Guid {
    return new Guid(id.replace(/[xy]/g, (c: string) => {
      const r: number = Math.random() * 16 | 0;
      const v: number = (c === 'x') ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }));
  }

  static get empty(): Guid {
    return this.newGuid(emptyGuidString);
  }

  static get nullGuid(): null {
    return null;
  }

  static isEqual(first: Guid, second: Guid): boolean {
    if (first && second) {
      return first.toString() === second.toString();
    } else {
      return false;
    }
  }

  static isEmpty(id: Guid): boolean {
    if (!id) { return true; }
    return id ? id.toString() === emptyGuidString : true;
  }

  static isValid(str: string): boolean {
    return this.validRegex.test(str);
  }

  constructor(value?: string) {
    if (value) {
      if (Guid.isValid(value)) {
        this.value = value;
      }
    }
  }

  toString(): string {
    return this.value;
  }

  get empty(): Guid {
    return Guid.empty;
  }

  get nullGuid(): null {
    return null;
  }

  toJSON(): string {
    return this.value;
  }
}
