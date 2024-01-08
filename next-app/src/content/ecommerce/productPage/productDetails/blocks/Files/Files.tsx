"use client"
import { FC } from "react";
import { saveAs } from 'file-saver';
import { GetAppOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FilesProps } from "./types";
import { styles } from './Files.styles';

const Files: FC<FilesProps> = ({ data }) => {
  const handleSave = (url: string, name: string) => {
    saveAs(url, name);
  }
  return (
    <Box sx={styles.container}>
      {data.map((file) => (
        <Box key={file.id} sx={styles.item} onClick={() => {
          if (file.mediaObject) {
            handleSave(file.mediaObject.pathToAsset, file.name)
          }
        }}>
          <GetAppOutlined fontSize="small" />
          <Typography variant="body2">
            {file.name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default Files;