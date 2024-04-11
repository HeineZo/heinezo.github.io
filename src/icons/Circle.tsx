import { motion } from "framer-motion";

export const Circle = ({ size = 24, ...props }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 169 80'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<motion.path
				d='M91.3032 19.5262C157.703 11.5262 178.62 34.4993 158.803 53.5262C138 73.5 127.203 79.1262 48.8033 75.5262C-29.5967 71.9262 10.1367 36.6929 39.8033 19.5262C57.8689 9.71367 102.8 -6.01145 138 9.58855'
				stroke='currentColor'
				strokeWidth='5'
                initial={{ pathLength: 0}}
                animate={{ pathLength: 1}}
                transition={{ duration: 1.5, ease: "easeInOut"}}
			/>
		</svg>
	);
};
