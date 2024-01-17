import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./index";

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  args: {
    className: "w-full max-w-[500px]",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};
