import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './tooltip';

interface Props {
	name: string;
}
export default function BrandIcon({ name }: Props) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<img
						height='24'
						width='24'
						loading='lazy'
						alt={name}
						src={`https://cdn.simpleicons.org/${name}`}
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p>{name}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
