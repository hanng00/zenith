import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";

// Button variants for TouchableOpacity (the container)
const buttonVariants = cva(
  "flex items-center justify-center gap-2 rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "bg-accent text-accent-foreground",
        link: "text-primary underline-offset-4 underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Button variants for the Text component (text-specific styling)
const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-input",
      secondary: "text-secondary-foreground",
      ghost: "text-accent-foreground",
      link: "text-primary underline",
    },
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-lg",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      className={buttonVariants({ variant, size })}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text className={textVariants({ variant, size })}>{children}</Text>
    </TouchableOpacity>
  );
};

export { Button };
