import { ChangeEvent, forwardRef, useState } from 'react';
import { Close, Search as SearchIcon } from '@mui/icons-material';
import { Box, IconButton, InputBase } from '@mui/material';
import { MuiStyle } from '@/types/mui';
import { styles } from './SearchField.styles';

type SearchFieldProps = {
  onSearch: (val: string) => void
  placeholder?: string
  sx?: MuiStyle;
  defaultValue?: string;
  isCloseAlwaysVisible?: boolean;
  autoFocus?: boolean;
  onClear?: () => void;
  onSubmit?: () => void;
}

const SearchField = forwardRef(({ onSearch, placeholder, sx = {}, defaultValue, isCloseAlwaysVisible, autoFocus, onClear, onSubmit }: SearchFieldProps, ref: React.Ref<HTMLDivElement>) => {
  const [value, setValue] = useState(defaultValue ?? '');
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onSearch(e.target.value);
    setValue(e.target.value)
  }
  const handleClear = () => {
    onSearch('');
    setValue('');
    onClear?.();
  }
  return (
    <Box sx={[styles.wrapper, sx]} ref={ref}>
      <IconButton sx={styles.iconBtn} onClick={onSubmit} aria-label="search icon">
        <SearchIcon />
      </IconButton>
      <InputBase
        autoFocus={autoFocus}
        sx={styles.input}
        value={value}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            onSubmit?.();
          }
        }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': `${placeholder}` }}
        onChange={handleChange}
      />
      {(value || isCloseAlwaysVisible) && (
        <IconButton size="small" onClick={handleClear} sx={styles.iconBtn} aria-label="search icon">
          <Close />
        </IconButton>
      )}

    </Box>
  )
});

SearchField.displayName = 'SearchField'

export default SearchField
