"use client"
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname } from 'next-intl/client';
import { FC, MouseEvent, useState, useTransition } from "react";
import * as Flags from "country-flag-icons/react/1x1";
import { Language } from "@mui/icons-material";
import { Box, Icon, IconButton, List, ListItemButton, Popover, Typography } from "@mui/material";
import { useStore } from "@/context/StoreContext";
import { LanguageSelectionDialogProps } from "../../types";
import { styles } from "./LanguageSelectionDialogStandard.styles";

const LanguageSelectionDialogStandard: FC<LanguageSelectionDialogProps> = () => {
	const locale = useLocale();
  const { languages } = useStore()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
	const currentLanguage = languages.find((language) => language.code === locale)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

	const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const updateLanguage = (code: string) => {
    startTransition(() => {
      router.replace(`/${code}${pathname}`);
    });
  }

  if (!currentLanguage) {
    return null;
  }

  return (
    <Box sx={styles.container}>
      <IconButton onClick={handleClick} disabled={isPending}>
        <Icon component={Flags[currentLanguage.countryCode] ?? Language} sx={styles.currentLanguageIcon} />
      </IconButton>
     
      <Popover
        id="simple-popover"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableScrollLock
        elevation={1}
      >
        <List sx={styles.languagesList}>
          {languages.map(language => (
            <ListItemButton
              key={language.code}
              onClick={() => {
                updateLanguage(language.code);
                handleClose();
              }}
              sx={styles.languageRow}
            > 
							<Typography variant="subtitle2" >
								{language.name}
							</Typography>             
              <Icon component={Flags[language.countryCode] ?? Language} sx={styles.listLanguageIcon} />
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </Box>
  );
}

export default LanguageSelectionDialogStandard