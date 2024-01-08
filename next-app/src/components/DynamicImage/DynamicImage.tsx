import { useStore } from '@/context/StoreContext';
import { MediaSourceType } from '@/types/page';
import { ImageProps } from '@/components/DynamicImage/types';

const getImgPath = (client: string, media: MediaSourceType) => `/media/${client}/${media.source}/${media.filePath}`
const DynamicImage = ({ media, className }: ImageProps) => {
	const { client } = useStore()
	if (!media) return null
	return <img className={className} src={getImgPath(client, media)} alt={media.createdAt} />
}
export default DynamicImage