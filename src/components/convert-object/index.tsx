import { Card, CardContent } from "@mui/material";
import { extractKeyValues } from "../../helpers/extract-key-values";
import Forms from "./Forms";
import Table, { ITableRows } from "../table";
import { useMemo, useState } from "react";

const ConvertObject = () => {
     const [value, setValue] = useState<{
          objectString: string;
          listString: string[];
     }>({ objectString: "", listString: [] });

     const handleSubmitConvert = (value: string, list: string) => {
          console.log(list.split("\n"));

          setValue({ objectString: value, listString: list.split("\n") });
     };

     const values = useMemo(() => {
          return extractKeyValues(value.objectString).map((el, i) => {
               const doubleValue = value.listString.find(
                    (string) =>
                         string.toLowerCase().trim() ===
                         el.value?.toString().toLowerCase().trim()
               );

               return {
                    ...el,
                    valueDuble: doubleValue,
                    id: i
               };
          });
     }, [value]);

     return (
          <Card>
               <CardContent>
                    <Forms handleSubmitConvert={handleSubmitConvert} />
               </CardContent>
               <CardContent>
                    <Table
                         columns={[
                              { field: "key", headerName: "key", width: 100 },
                              {
                                   field: "value",
                                   headerName: "object value",
                                   width: 200
                              },
                              {
                                   field: "valueDuble",
                                   headerName: "double value",
                                   width: 200
                              }
                         ]}
                         rows={values as unknown as ITableRows[]}
                    />
               </CardContent>
          </Card>
     );
};

export default ConvertObject;
