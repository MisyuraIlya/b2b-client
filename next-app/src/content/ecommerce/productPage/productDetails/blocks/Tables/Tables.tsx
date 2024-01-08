"use client"
import { FC } from "react";
import { TablesProps } from "./types";

import ProductTable from "./ProductTable";

const Tables: FC<TablesProps> = ({ data }) => {
  return (
    data.map((productTable) => (
      productTable.columns.length ? (
        <ProductTable data={productTable} key={productTable.id} />
      ) : null
    ))
  )
}

export default Tables;