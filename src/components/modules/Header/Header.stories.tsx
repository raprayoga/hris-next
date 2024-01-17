import type { Meta, StoryObj } from "@storybook/react";
import Header from "./index";

const meta: Meta<typeof Header> = {
  component: Header,
  args: {
    className: "w-full",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
