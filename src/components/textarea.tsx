import type { HTMLProps } from "react";

export const Textarea = ({ ...rest }: HTMLProps<HTMLTextAreaElement>) => {
	return (
		<textarea
			className="w-full resize-none h-40 p-3 rounded-lg border border-gray-400"
			{...rest}
		/>
	);
};
