import {
     Card,
     CardContent,
     CardHeader,
     Divider,
     List,
     ListItem,
     ListItemIcon,
     ListItemText,
     ListSubheader,
     Typography
} from "@mui/material";
import { extractKeyValues } from "../../helpers/extract-key-values";
import Forms from "./Forms";
import Table, { ITableRows } from "../table";
import { useMemo, useState } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

const ConvertObject = () => {
     const [value, setValue] = useState<{
          objectString: string;
          listString: string[];
          type: null | boolean;
     }>({ objectString: "", listString: [], type: null });

     const handleSubmitConvert = (value: string, list: string) => {
          setValue((prev) => ({
               ...prev,
               objectString: value,
               listString: list.split("\n")
          }));
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
     const isActivesWords: {
          errorCount: number;
          successCount: number;
          allCount: number;
          array: { active: boolean; title: string; id: string }[];
     } = value.listString.reduce(
          (acc, item, i) => {
               const isActive = values.find(
                    (el) =>
                         item.toLowerCase().trim() ===
                         el.value?.toString().toLowerCase().trim()
               );

               return {
                    errorCount: acc.errorCount + (isActive ? 0 : 1),
                    successCount: acc.successCount + (isActive ? 1 : 0),
                    allCount: i + 1,
                    array: [
                         ...acc.array,
                         {
                              active: isActive ? true : false,
                              title: item,
                              id: item + (isActive ? "active" : "inactive") + i
                         }
                    ]
               };
          },
          { errorCount: 0, successCount: 0, allCount: 0, array: [] } as {
               errorCount: number;
               successCount: number;
               allCount: number;
               array: { active: boolean; title: string; id: string }[];
          }
     );

     const handleFilterByActiveErrors = () => {
          setValue((prev) => ({ ...prev, type: true }));
     };

     const handleFilterByActiveSuccess = () => {
          setValue((prev) => ({ ...prev, type: false }));
     };

     const handleFilterByActiveAll = () => {
          setValue((prev) => ({ ...prev, type: null }));
     };

     const filteredWords = isActivesWords.array.filter((el) =>
          value.type === null ? true : el.active === value.type
     );

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
                              { field: "key", headerName: "key", width: 250 },
                              {
                                   field: "value",
                                   headerName: "object value",
                                   width: 250
                              },
                              {
                                   field: "valueDuble",
                                   headerName: "double value",
                                   width: 250
                              }
                         ]}
                         rows={values as unknown as ITableRows[]}
                    />
               </CardContent>
               <CardContent>
                    <List
                         sx={{
                              width: "100%",
                              bgcolor: "background.paper",
                              position: "relative",
                              overflow: "auto",
                              maxHeight: 500,
                              "& ul": { padding: 0 }
                         }}
                    >
                         <ListSubheader sx={{ display: "flex" }}>
                              <ListItemIcon
                                   sx={{
                                        color: "success.main"
                                   }}
                                   onClick={handleFilterByActiveSuccess}
                              >
                                   <CheckBoxIcon />
                              </ListItemIcon>

                              <ListItemText
                                   primary={isActivesWords.successCount}
                              />

                              <Divider orientation="vertical" flexItem />

                              <ListItemIcon
                                   sx={{
                                        color: "error.main"
                                   }}
                                   onClick={handleFilterByActiveErrors}
                              >
                                   <ReportGmailerrorredIcon />
                              </ListItemIcon>

                              <ListItemText
                                   primary={isActivesWords.errorCount}
                              />

                              <Divider orientation="vertical" flexItem />

                              <ListItemIcon onClick={handleFilterByActiveAll}>
                                   <AllInboxIcon />
                              </ListItemIcon>

                              <ListItemText primary={isActivesWords.allCount} />
                         </ListSubheader>
                         {filteredWords.map((el, i) => (
                              <ListItem key={el.id}>
                                   <Typography width={30}> {i + 1}</Typography>

                                   <ListItemIcon
                                        sx={{
                                             color: el.active
                                                  ? "success.main"
                                                  : "error.main"
                                        }}
                                   >
                                        {el.active ? (
                                             <CheckBoxIcon />
                                        ) : (
                                             <ReportGmailerrorredIcon />
                                        )}
                                   </ListItemIcon>
                                   <ListItemText primary={el.title} />
                              </ListItem>
                         ))}
                    </List>
               </CardContent>
          </Card>
     );
};

export default ConvertObject;
