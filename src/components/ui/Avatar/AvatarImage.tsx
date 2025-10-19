"use client";

import { Image } from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const AvatarImage = ({ className, ...props }: ComponentProps<typeof Image>) => {
	return (
		<Image
			data-slot="avatar-image"
			className={cn("aspect-square size-full", className)}
			{...props}
		/>
	);
};

export default AvatarImage;
