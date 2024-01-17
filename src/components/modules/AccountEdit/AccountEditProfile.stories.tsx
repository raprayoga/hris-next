import type { Meta, StoryObj } from "@storybook/react";
import AccountEditProfile from "./index";

const meta: Meta<typeof AccountEditProfile> = {
  component: AccountEditProfile,
  args: {
    className: "w-full",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AccountEditProfile>;

export const Default: Story = {};
