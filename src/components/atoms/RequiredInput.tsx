import { DefaultProps } from '@/styles/DefaultProps';
import { FormEvent, FormEventHandler } from 'react';

export interface RequiredInputProps extends DefaultProps {
  placeholder: string;
  name: string;
  onChange: FormEventHandler<HTMLDivElement | HTMLTextAreaElement>;
  value: string;
  type?: string;
}

export const RequiredInput = ({
  placeholder,
  name,
  onChange,
  value,
  type = 'text',
  ...props
}: RequiredInputProps) => {
  return (
    <input
      css={{
        width: '100%',
        height: 50,
        color: 'rgba(115, 119, 127, 0.7)',
        borderColor: '#c9c9c9',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 16,
        marginBottom: 20,
      }}
      type={type}
      placeholder={placeholder}
      required
      name={name}
      onChange={onChange}
      value={value}
    ></input>
  );
};
