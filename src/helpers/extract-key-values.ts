import { ConvertObjectValue } from "../types/extract-key-values";

export function extractKeyValues(inputString: string): ConvertObjectValue[] {
     const jsonString: string = `{${inputString.trim().replace(/\n\s*/g, "")}}`;

     const matches: RegExpMatchArray | null = jsonString.match(
          /\[?(\w+)\]?:\s*([^,]+)(?=(,|$))/g
     );

     if (!matches) {
          return [];
     }

     const keyValues: ConvertObjectValue[] = matches.map((match) => {
          const [fullMatch, key, value] =
               match.match(/\[?(\w+)\]?:\s*([^,]+)(?=(,|$))/) || [];
          return {
               key,
               value: value.trim().replace(/'/g, "").replace(/"/g, "")
          };
     });

     return keyValues;
}
