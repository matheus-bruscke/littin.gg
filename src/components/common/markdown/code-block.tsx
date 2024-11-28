"use client";
import { cn } from "@/utils/cn";
import { formatCode } from "@/utils/format";
import hljs from "highlight.js";
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
        "relative mb-8 border border-neutral-700 border-dashed bg-neutral-950"
      )}
      {...props}
    >
      {children}
      <button
        onClick={handleCopy}
        type="button"
        className="absolute top-0 right-2 p-2 font-sans text-neutral-500 text-sm transition-colors hover:text-red-500"
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </pre>
  );
};

export default CodeBlock;
