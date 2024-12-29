import * as React from "react";
import { TextInput as NativeTextInput } from "react-native";

import { cn } from "@/src/lib/utils";

const TextInput = React.forwardRef<
  React.ElementRef<typeof NativeTextInput>,
  React.ComponentPropsWithoutRef<typeof NativeTextInput>
>(({ className, ...props }, ref) => {
  return (
    <NativeTextInput
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm first:text-foreground",
        className,
      )}
      {...props}
    />
  );
});
TextInput.displayName = "Input";

export { TextInput };
