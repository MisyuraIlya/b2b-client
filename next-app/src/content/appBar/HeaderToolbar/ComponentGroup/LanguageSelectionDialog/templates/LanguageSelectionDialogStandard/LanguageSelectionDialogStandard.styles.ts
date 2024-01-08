import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  currentLanguageIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '100%'
  },
  listLanguageIcon: {
    width: '20px',
    height: '20px',
    borderRadius: '100%'
  },
  languageRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2px',
    '&:hover': {
      color: 'primary.main',
    }
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  currentLanguage: {
    width: '48px',
    height: '24px',
    textAlign: 'center',
    cursor: 'pointer'
  },
  languagesList: {
    width: 176,
    padding: '10px'
  }
}