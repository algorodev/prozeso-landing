"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { LocalizedLink } from "@/i18n/LocalizedLink";

type NavChild = {
	label: string;
	href: string;
	description?: string;
};

type NavItem = {
	label: string;
	href?: string;
	children?: NavChild[];
};

type Props = {
	item: NavItem;
	activePath: string | null;
}

export const DesktopNav = ({ item, activePath }: Props) => {
	const isActive =
		item.href && activePath ? activePath.startsWith(item.href) : false;

	if (!item.children?.length) {
		return (
			<Button
				asChild
				variant={isActive ? "secondary" : "ghost"}
				className="rounded-xl"
			>
				<LocalizedLink href={item.href ?? "#"} className="px-3">
					{item.label}
				</LocalizedLink>
			</Button>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant={isActive ? "secondary" : "ghost"}
					className="rounded-xl"
				>
					{item.label}
					<ChevronDown className="ml-1 size-4 opacity-70" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="min-w-64">
				<DropdownMenuLabel className="text-xs text-muted-foreground">
					{item.label}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{item.children.map((child) => (
					<DropdownMenuItem key={child.href} asChild>
						<LocalizedLink href={child.href} className="flex flex-col">
							<span className="text-sm leading-tight">{child.label}</span>
							{child.description ? (
								<span className="text-xs text-muted-foreground leading-tight">
									{child.description}
								</span>
							) : null}
						</LocalizedLink>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
