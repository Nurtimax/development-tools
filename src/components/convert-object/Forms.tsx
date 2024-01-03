import { Button, Grid, TextField } from "@mui/material";
import React, { FC, useState } from "react";

interface IFormsProps {
     handleSubmitConvert: (value: string, list: string) => void;
}

const Forms: FC<IFormsProps> = ({ handleSubmitConvert }) => {
     const [stringObject, setStringObject] = useState<string>("");
     const [wordListValue, setWordListValue] = useState<string>("");

     return (
          <Grid container spacing={3}>
               <Grid item xs={6}>
                    <TextField
                         fullWidth
                         onChange={(e) => setStringObject(e.target.value)}
                         value={stringObject}
                         multiline
                         rows={10}
                         label="object paste"
                    />
               </Grid>
               <Grid item xs={6}>
                    <TextField
                         label="word list"
                         multiline
                         rows={10}
                         fullWidth
                         onChange={(e) => setWordListValue(e.target.value)}
                    />
               </Grid>
               <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button
                         variant="contained"
                         size="large"
                         onClick={() =>
                              handleSubmitConvert(stringObject, wordListValue)
                         }
                         disabled={!stringObject || !wordListValue}
                    >
                         Convert
                    </Button>
               </Grid>
          </Grid>
     );
};

export default Forms;
