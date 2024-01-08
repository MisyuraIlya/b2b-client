"use client"
import { useLocale } from "next-intl";
import { FC } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getTranslation } from "@/utils/getTranslation";
import { TableProps } from "./types";
import { styles } from './ProductTable.styles';

const ProductTable: FC<TableProps> = ({ data }) => {
  const locale = useLocale();
  return (
    <TableContainer sx={styles.container}>
      <Table sx={styles.table}>
        <TableHead>
          <TableRow>
            {data.columns.map((column) => {
              const columnTranslation = getTranslation(locale, column);
              return (
                <TableCell key={columnTranslation}>
                  {columnTranslation}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.values.map((row) => (
            <TableRow key={row.join()}>
              {row.map((value) => (
                <TableCell key={value}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  )
}

export default ProductTable;