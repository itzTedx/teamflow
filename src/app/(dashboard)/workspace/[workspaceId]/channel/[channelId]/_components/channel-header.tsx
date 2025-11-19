import { ThemeToggle } from "@/components/theme-toggle";

export const ChannelHeader = () => {
  return (
    <div className="flex h-14 items-center justify-between border-b px-4">
      <h1 className="font-semibold text-lg"># super-cool</h1>

      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
};
