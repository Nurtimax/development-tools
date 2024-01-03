import { Card, CardContent, CardHeader } from "@mui/material";
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
               <CardHeader
                    title="Convert to string object"
                    titleTypographyProps={{ textAlign: "center" }}
               />
               <CardContent>
                    <Forms handleSubmitConvert={handleSubmitConvert} />
               </CardContent>
               <CardContent>
                    <Table
                         columns={[
                              { field: "key", headerName: "key", width: 300 },
                              {
                                   field: "value",
                                   headerName: "object value",
                                   width: 300
                              },
                              {
                                   field: "valueDuble",
                                   headerName: "double value",
                                   width: 300
                              }
                         ]}
                         rows={values as unknown as ITableRows[]}
                    />
               </CardContent>
          </Card>
     );
};

export default ConvertObject;
