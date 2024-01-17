import {FC, useEffect, useRef} from "react";
import {NOOP_FN} from "@/lib/noop.ts";
import {processRaw} from "@/features/wisiwig/process_md.ts";

// md typo
import "./style.css";

// theme
import "@/features/wisiwig/themes/poimandres.css";

// code highlighting
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";

export interface ReaderProps {
  // raw markdown
  children: string;
  className?: string;
}

export interface LazyReaderProps extends ReaderProps {
  // loaded
  onProcessed?(): void;

  // start loading
  onProcess?(): void;

  onError?(msg: string): void;
}

/**
 * Processes then renders raw markdown
 */
export const LazyReader: FC<LazyReaderProps> = ({
  children,
  className = "",
  onProcessed = NOOP_FN,
  onProcess = NOOP_FN,
  onError = NOOP_FN,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // At this point, we can assert react ref as non_null
    const container = containerRef.current!;
    const process = async () => {
      try {
        onProcess();
        const html = await processRaw(children);
        container.innerHTML = String(html);
        onProcessed();
      } catch (e) {
        onError(e as string);
      }
    };

    void process();
  }, [children, onError, onProcessed, onProcess]);

  return (
    <div
      className={`markdown-view p-4 text-gray-800 ${className}`}
      ref={containerRef}
    ></div>
  );
};

/**
 * Renders processed markdown
 *
 * **[unsafe]** as it hasn't been sanitized
 */
export const Reader: FC<ReaderProps> = ({children: __html, className = ""}) => {
  return (
    <div
      className={`markdown-view p-4 text-gray-800 ${className}`}
      dangerouslySetInnerHTML={{__html}}
    ></div>
  );
};
