import type { JSX, PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
	name: string;
	description: string;
	logo: string;
}

export const Card = ({ children, name, description, logo }: CardProps): JSX.Element => {
	return (
		<div className="block p-4 bg-white rounded-xl shadow-sm dark:border dark:border-neutral-600 dark:bg-neutral-800" >
			<div className="flex flew-row gap-4 pb-4">
				<div className="w-16 h-16">
					<img className="max-w-full" alt={`Extension ${name} icon`} src={logo}></img>
				</div>
				<div>
					<h2 className="font-bold text-neutral-900 dark:text-white text-sm pb-1">
						{name}
					</h2>
					<p className="text-xs text-neutral-600 dark:text-neutral-300">
						{description}
					</p>
				</div>
			</div>
			<div className="flex flex-row justify-between items-center">
				{children}
			</div>
		</div>
	)
}