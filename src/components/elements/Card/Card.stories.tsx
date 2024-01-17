import type { Meta, StoryObj } from "@storybook/react";
import Card from "./index";

const meta: Meta<typeof Card> = {
  component: Card,
  args: {
    children: "Card",
    theme: "primary",
    size: "small",
    className: "w-36 text-green",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};
