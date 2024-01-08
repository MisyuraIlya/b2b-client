import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { FormDescriptionProps } from "./types";
import { styles } from "./FormDescription.styles";

const FormDescription: FC<FormDescriptionProps> = ({ title, description }) => {
  return (
    <Box>
      <Typography component="h1" variant="h2">
        {title}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={styles.description}
      >
        {description}
      </Typography>
    </Box>
  )
}

export default FormDescription;