"use client"

import { FC } from "react";
import { Box } from "@mui/material";
import { LabelsProps } from "./types";
import { styles } from './Labels.styles';

import Label from "./Label";

const Labels: FC<LabelsProps> = ({ data, size, sx = null }) => {
  return (
    <Box sx={[styles.container, sx]}>
      {data.map((label) => (
        <Label data={label} key={label.id} size={size} />
      ))}
    </Box>
  )
};

export default Labels;