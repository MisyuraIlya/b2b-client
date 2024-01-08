"use client"
import { useLocale, useTranslations } from "next-intl";
import { parseAsInteger, parseAsString, useQueryState } from "next-usequerystate";
import { FC, memo, useState } from "react";
import { Grid, Typography } from "@mui/material";
import SearchField from "@/components/SearchField";
import { useStore } from "@/context/StoreContext";
import alphabets from "@/utils/alphabets";
import { BrandsListFiltersProps } from "./types";
import { styles } from './BrandsListDefault.styles';

const NUMBER_KEY = '1';

const BrandsListFilters: FC<BrandsListFiltersProps> = memo(({ handleChangeAlphabet }) => {
  const locale = useLocale();
  const { languages } = useStore()
  const [selectedAlphabet, setSelectedAlphabet] = useState(locale);
  const [searchValue, setSearchValue] = useQueryState('word', parseAsString);
  const [selectedLetter, setSelectedLetter] = useQueryState('letter', parseAsString);
  const [selectedNumber, setSelectedNumber] = useQueryState('number', parseAsString);
  const [page, setPage] = useQueryState('page', parseAsInteger);
  const t = useTranslations();
  let searchTimeout: NodeJS.Timeout;
  const handleChangeSearch = (value: string) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setPage(1)
      setSearchValue(value || null);
    }, 400)
  };
  const handleChangeLetter = (value: string | null) => {

    if (page && value) {
      setPage(1);
    }
    if (value === NUMBER_KEY) {
      setSelectedNumber(value);
      setSelectedLetter(null)
    } else {
      setSelectedNumber(null);
      setSelectedLetter(value);
    }
  };
  const onChangeAlphabet = (value: string) => {
    setSelectedAlphabet(value);
    handleChangeLetter(null);
    handleChangeAlphabet(value);
  };

  return (
    <Grid container spacing={3} sx={styles.searchRow}>
      <Grid item lg={3} md={4} xs={12}>
        <SearchField
          onSearch={(val) => { handleChangeSearch(val.trim()) }}
          placeholder={t('SHOP_INPUT_PLACEHOLDER_SEARCH')}
          sx={styles.search}
          defaultValue={searchValue ?? ''}
        />
      </Grid>
      <Grid sx={styles.navigation} item lg={9} md={8} xs={12}>
        <Typography
          onClick={() => {
            handleChangeLetter(null);
          }}
          sx={[styles.navigationItem, !selectedLetter && !selectedNumber ? styles.navigationItemSelected : null]}
          variant="subtitle2"
        >
          {t('SHOP_LABEL_ALL_BRANDS')}
        </Typography>
        <Typography
          onClick={() => {
            handleChangeLetter(NUMBER_KEY);
          }}
          sx={[styles.navigationItem, selectedNumber ? styles.navigationItemSelected : null]}
          variant="subtitle2"
        >
          {'0-9'}
        </Typography>
        {alphabets[selectedAlphabet]?.map((key) => {
          return (
            <Typography
              onClick={() => {
                handleChangeLetter(key);
              }}
              sx={[styles.navigationItem, selectedLetter === key ? styles.navigationItemSelected : null]}
              key={key}
              variant="subtitle2"
            >
              {key}
            </Typography>
          )
        })}
        {languages.filter((language) => language.code !== selectedAlphabet).map((language) => {
          const alphabet = alphabets[language.code];
          return alphabet ? (
            <Typography
              onClick={() => {
                onChangeAlphabet(language.code);
              }}
              sx={styles.navigationItem}
              key={language.code}
              variant="subtitle2"
            >
              {`${alphabet[0]}-${alphabet[alphabet.length - 1]}`}
            </Typography>
          ) : null
        })}
      </Grid>
    </Grid>
  )
});
BrandsListFilters.displayName = 'BrandsListFilters'

export default BrandsListFilters;