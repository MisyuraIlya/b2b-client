"use client"
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { FC, useEffect, useRef, useState } from "react";
import { Box, CircularProgress, ClickAwayListener, Divider, Fade, Popper, Typography } from "@mui/material";
import Link from "@/components/Link";
import NextImage from "@/components/NextImage";
import { useApi } from "@/hooks/api/useApi";
import urls from "@/provider/api/urls";
import { getTranslation } from "@/utils/getTranslation";
import SearchField from "../SearchField";
import { GlobalSearchProps } from "./types";
import { ProductList } from "@/content/ecommerce/catalog/productsList/types";
import { styles } from "./GlobalSearch.styles";

const MIN_SEARCH_LENGTH = 3;

const GlobalSearch: FC<GlobalSearchProps> = ({ link = `/${urls.pages.search}`, onClear, isDropdown, autoFocus, defaultValue, sx = null }) => {
	const locale = useLocale();
	const router = useRouter();
	const inputContainerRef = useRef<HTMLDivElement>(null)
	const [value, setValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const { data, isLoading } = useApi<ProductList>({
		entrypoint: urls.client.searchProductsByWord,
		params: [searchValue],
		skip: searchValue.length < MIN_SEARCH_LENGTH,
		searchParams: { perPage: 10 }
	});
	const t = useTranslations();

	useEffect(() => {
		const searchTimeout = setTimeout(() => {
			setSearchValue(value);
			setAnchorEl(inputContainerRef.current)
		}, 400);
		return () => {
			clearTimeout(searchTimeout)
		}
	}, [value])

	const handleClear = () => {
		setValue('');
		onClear?.();
	}

	const handleSubmit = () => {
		if (searchValue.trim().length >= MIN_SEARCH_LENGTH && data?.totalProducts) {
			router.push(`${link}/${searchValue}`);
			handleClear();
		}
	}

	const getContent = () => (
		data?.data || isLoading ? (
			<Box sx={styles.searchResult}>
				{isLoading ? (
					<Box sx={styles.progress}>
						<CircularProgress />
					</Box>
				) : null}
				{!isLoading && data?.data.map((item, index) => (
					<Box sx={styles.searchRow} component={Link} key={`${item}-${index}`} href={`/product/${item.id}`}>
						<Box sx={styles.image}>
							<NextImage src={item.productCardMedia?.thumbnailSmallPath} />
						</Box>
						<Box sx={styles.searchResultContent}>
							<Box>
								<Typography variant="body2" sx={styles.searchResultItemName}>
									{getTranslation(locale, item.translations, item.title)}
								</Typography>
								{item.brand && (
									<Typography variant="body2" sx={[styles.searchResultItem, styles.searchResultItemBrand]}>
										{getTranslation(locale, item.brand.translations, '')}
									</Typography>
								)}
							</Box>
							<Divider />
						</Box>

					</Box>
				))}
				{!isLoading && data?.totalProducts ? (
					<Box sx={styles.viewAllResults}>
						<Link onClick={() => handleClear()} href={`${link}/${value}`}>
							<Typography variant="subtitle2" >
								{t('SHOP_MENU_SEARCH_VIEW_ALL_RESULTS')}
							</Typography>
						</Link>

					</Box>
				) : null}
				{!isLoading && !data?.totalProducts && (
					<Typography sx={styles.empty} variant="subtitle2">
						{t('SHOP_LABEL_NO_MATCHES_FOUND')}
					</Typography>
				)}
			</Box>
		) : null
	);
	const open = Boolean(anchorEl);

	return (
		<>
			<Box
				ref={inputContainerRef}
				sx={[styles.searchContainer, sx]}
			>
				<SearchField onSubmit={handleSubmit} defaultValue={defaultValue} autoFocus={autoFocus} placeholder={t('SHOP_INPUT_PLACEHOLDER_SEARCH')} onSearch={setValue} sx={styles.input} isCloseAlwaysVisible onClear={handleClear} />
				{!isDropdown && getContent()}
			</Box>
			{isDropdown && (
				<Popper
					anchorEl={anchorEl}
					open={open}
					disablePortal
					placement="bottom"
					role={undefined}
					sx={[{ zIndex: 10, width: anchorEl?.clientWidth }]}
				>
					<Box>
						<ClickAwayListener onClickAway={() => setAnchorEl(null)}>
							<Box>
								{getContent()}
							</Box>
						</ClickAwayListener>
					</Box>
				</Popper>
			)}
		</>
	)
}

export default GlobalSearch