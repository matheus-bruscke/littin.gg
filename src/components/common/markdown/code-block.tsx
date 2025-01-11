"use client";
import { cn } from "@/utils/cn";
import { formatCode } from "@/utils/format";
import hljs from "highlight.js";
import { CheckIcon, ClipboardCopyIcon, ClipboardIcon } from "lucide-react";
import React from "react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, ...props }) => {
	const [isCopied, setIsCopied] = React.useState(false);

	const handleCopy = () => {
		const codeLines: string[] = [];

		React.Children.forEach(children, (child: any) => {
			if (typeof child.props.children === "string") {
				codeLines.push(child.props.children);
			}
		});

		const code = formatCode(codeLines);

		navigator.clipboard.writeText(code);

		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	React.useEffect(() => {
		hljs.highlightAll();
	}, []);

	return (
		<pre
			className={cn(
				"group relative mb-8 rounded-lg border border-neutral-800 bg-neutral-950 p-2",
			)}
			{...props}
		>
			{children}
			<button
				onClick={handleCopy}
				type="button"
				className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center text-neutral-500 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"
			>
				{isCopied ? (
					<CheckIcon size={16} className="text-green-300" />
				) : (
					<ClipboardCopyIcon size={16} />
				)}
			</button>
		</pre>
	);
};

export default CodeBlock;
