import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { FC, memo } from "react";

export interface ITableRows {
     [key: string]: unknown;
}

export type ITableHeaders = GridColDef;

interface ITableProps {
     rows: ITableRows[];
     columns: ITableHeaders[];
}

const Table: FC<ITableProps> = ({ rows, columns }) => {
     return (
          <Box sx={{ height: 650, width: "100%" }}>
               <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                         pagination: {
                              paginationModel: {
                                   pageSize: 10
                              }
                         }
                    }}
                    pageSizeOptions={[20]}
                    checkboxSelection
                    disableRowSelectionOnClick
               />
          </Box>
     );
};

export default memo(Table);
