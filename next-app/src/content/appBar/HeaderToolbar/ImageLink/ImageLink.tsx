"use client"
import { FC } from "react";
import DynamicImage from "@/components/DynamicImage";
import DynamicMuiComponent from "@/components/DynamicMuiComponent";
import Link from "@/components/Link";
import {TopBarItem} from "@/types/initData";
import style from './ImageLink.module.css';

const ImageLink: FC<TopBarItem> = ({ media, mui, link}) =>
	<Link href={link || '/'}>
		<DynamicMuiComponent data={mui}>
			<DynamicImage media={media} className={style.img} />
		</DynamicMuiComponent>
	</Link>

export default ImageLink