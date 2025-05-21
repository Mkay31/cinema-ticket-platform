export class ObjectUtils {
    /**
     * Returns the array of values
     *
     * @param Obj - It has multiple key - value pairs
     */
    public static getObjectValues<T>(obj: { [key: string]: T }): T[] {
        return Object.keys(obj).map((key) => obj[key]);
    }
}
