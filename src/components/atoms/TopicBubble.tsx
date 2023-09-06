import { DefaultProps, getDefaultProps } from '@/styles/DefaultProps';
import IconPopular from './IconPopular';

export interface TopicBubbleProps extends DefaultProps {
  name: string;
  hightlight?: boolean;
  height?: number;
  padding?: number;
  radius?: number;
  children?: React.ReactNode;
}
const TopicBubble = ({ name, hightlight, height, padding, radius, ...props }: TopicBubbleProps) => {
  return (
    <div
      css={[
        {
          width: 'fit-content',
          height: height || '24px',
          borderRadius: radius || '12px',
          padding: padding || '3px 6px',
          marginRight: '6px',
          backgroundColor: hightlight ? '#fcdede' : '#f2f4f5',
          color: hightlight ? '#ff5656' : '#999999',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
        },
        getDefaultProps(props),
      ]}
    >
      {hightlight && <IconPopular />}
      {name}
    </div>
  );
};
export default TopicBubble;
