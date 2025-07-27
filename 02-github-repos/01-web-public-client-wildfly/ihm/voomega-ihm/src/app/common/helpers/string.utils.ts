export class StringUtils {

  public static EMPTY_STRING: String = "";

  private constructor() {}

  public static isUndefinedOrEmpty(str: String|undefined) : boolean {
    return (!(undefined !== str && null!== str && 0 < str.length));
  }

  public static replace(str: String|undefined, subString1: String|undefined, subString2: String): String {
    if (!this.isUndefinedOrEmpty(str)) {
      if(!this.isUndefinedOrEmpty(subString1) &&
        !this.isUndefinedOrEmpty(subString2)) {
        return str!.replace(new RegExp(`${subString1}`,"gi"), String(subString2));
      }
      return str!;
     }
    return this.EMPTY_STRING;
  }

  public static isContains(str: String|undefined, subStr: String|undefined, position?: number) : Boolean {
    if (!this.isUndefinedOrEmpty(str) && !this.isUndefinedOrEmpty(subStr)) {
      const isIncludes: Boolean =  str!
        .trim()
        .toLowerCase()
        .includes(subStr!.trim().toLowerCase(), position);
      return isIncludes;
    }
    return false;
  }
}
