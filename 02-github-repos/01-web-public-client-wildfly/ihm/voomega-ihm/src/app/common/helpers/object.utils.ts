export class ObjectUtils {

  public static EMPTY_OBJECT: any = {};

  private constructor() {}

  public static isUndefinedOrNull(obj: any) : boolean {
    return (!(undefined !== obj && null!== obj));
  }
}
