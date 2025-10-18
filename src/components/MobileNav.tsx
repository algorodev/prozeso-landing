"use client";

import {Menu, User } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/Sheet";
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
	nav?: NavItem[];
	cta?: { label: string; href: string };
}

export const MobileNav = ({ nav = [], cta }: Props) => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu className="size-5" />
					<span className="sr-only">Open menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-[84vw] p-0">
				<SheetHeader className="px-4 py-3">
					<SheetTitle className="text-left">Menu</SheetTitle>
				</SheetHeader>
				<div className="px-4 pb-4">
						<div className="flex items-center gap-2 py-2">
							<Button className="flex-1" variant="secondary">
								<LocalizedLink href="/auth/login">
									<User className="mr-2 size-4" /> Sign in
								</LocalizedLink>
							</Button>
							{cta ? (
								<Button asChild className="flex-1">
									<LocalizedLink href={cta.href}>{cta.label}</LocalizedLink>
								</Button>
							) : null}
						</div>
					<Separator className="my-3" />
					<Accordion type="single" collapsible className="w-full">
						{nav.map((item) => (
							<AccordionItem key={item.label} value={item.label}>
								{item.children?.length ? (
									<AccordionTrigger className="px-1 py-2 text-base">
										{item.label}
									</AccordionTrigger>
								) : (
									<div className="px-1 py-2">
										<LocalizedLink
											href={item.href ?? "#"}
											className="block rounded-xl px-2 py-2 hover:bg-accent"
										>
											{item.label}
										</LocalizedLink>
									</div>
								)}
								{item.children?.length ? (
									<AccordionContent>
										<ul className="mb-2 space-y-1">
											{item.children.map((child) => (
												<li key={child.href}>
													<LocalizedLink
														href={child.href}
														className="block rounded-xl px-3 py-2 hover:bg-accent"
													>
														<div className="text-sm">{child.label}</div>
														{child.description ? (
															<div className="text-xs text-muted-foreground">
																{child.description}
															</div>
														) : null}
													</LocalizedLink>
												</li>
											))}
										</ul>
									</AccordionContent>
								) : null}
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</SheetContent>
		</Sheet>
	);
