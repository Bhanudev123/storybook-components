import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your name",
    helperText: "This is a helper text",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    invalid: true,
    errorMessage: "Invalid email address",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    placeholder: "Can't type here",
    disabled: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <InputField label="Filled" variant="filled" placeholder="Filled input" />
      <InputField label="Outlined" variant="outlined" placeholder="Outlined input" />
      <InputField label="Ghost" variant="ghost" placeholder="Ghost input" />
    </div>
  ),
};
