import { useTranslations } from "next-intl";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "next-usequerystate";
import { FC, useEffect, useState } from "react";
import { FilterList } from "@mui/icons-material";
import { Box, Button, Popover } from "@mui/material";
import CatalogFilterPanel from "@/content/sidebar/catalogFilterMenu/templates/CatalogFilterPanel";
import { styles } from './Filters.styles';

const Filters: FC = () => {
  const t = useTranslations();
  const [filters] = useQueryState('filters', parseAsArrayOf(parseAsInteger));

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    setAnchorEl(null);
  }, [filters])


  return (
    <Box>
      <Button
        variant="outlined"
        color="inherit"
        sx={styles.openBtn}
        onClick={handleClick}
        startIcon={<FilterList />}
      >
        {t('SHOP_FILTER_TITLE')}
      </Button>
      <Popover
        sx={styles.filters}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <CatalogFilterPanel />
      </Popover>
    </Box>
  )
}

export default Filters;