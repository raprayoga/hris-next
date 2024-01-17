import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./index";

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  args: {
    className: "w-full max-w-[500px]",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};
