"use client"
import { useTranslations } from "next-intl";
import { FC } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { Box, Pagination as MuiPagination, PaginationItem, SelectChangeEvent, Typography } from "@mui/material";
import Select from '@/components/Select';
import { DirectionEnum } from "@/config/direction";
import { useStore } from "@/context/StoreContext";
import { PaginationProps } from "./types";
import { styles } from "./Pagination.styles";


const Pagination: FC<PaginationProps> = ({ page, totalPages, sx = null, label, perPage, perPageOptions, disabled, changePagination }) => {
  const t = useTranslations();
  const { direction } = useStore();

  const handleChangePage = (page: number) => {
    changePagination(page, perPage);
  }
  const handleChangePerPage = (event: SelectChangeEvent<number>) => {
    changePagination(1, event.target.value as number);
  }
  return (
    <Box sx={[styles.paginationContainer, sx]}>
      {label && (
        <Typography variant="subtitle2" sx={styles.label} >
          {label}
        </Typography>
      )}

      <MuiPagination
        onChange={(e, p) => handleChangePage(p)}
        sx={[styles.pagination, direction === DirectionEnum.rtl ? styles.paginationRtl : null]}
        page={page}
        count={totalPages}
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
        color="primary"
        size="large"
        disabled={disabled}
        renderItem={(item) => {
          return (
            <PaginationItem
              {...item}
              components={{
                first: KeyboardDoubleArrowLeft,
                previous: KeyboardArrowLeft,
                next: KeyboardArrowRight,
                last: KeyboardDoubleArrowRight
              }}
              sx={styles.firstLastIcon}
            />
          )
        }}
      />
      <Select containerSx={styles.select} options={perPageOptions.map((option) => ({ value: option, text: `${option} ${t('SHOP_LABEL_ITEMS')}` }))} value={perPage} onChange={handleChangePerPage} disabled={disabled} />
    </Box>
  );
}

export default Pagination;