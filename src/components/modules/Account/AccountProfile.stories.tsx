import type { Meta, StoryObj } from "@storybook/react";
import AccountProfile from "./index";

const meta: Meta<typeof AccountProfile> = {
  component: AccountProfile,
  args: {
    className: "w-full",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AccountProfile>;

export const Default: Story = {};
