import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: "Button",
    theme: "primary",
    variant: "filled",
    className: "w-36",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};
