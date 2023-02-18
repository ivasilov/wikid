import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './icon';

interface SpinnerProps {
  className?: string;
  color?: string;
  size?: SizeProp;
}

export const Spinner = (props: SpinnerProps) => {
  return <Icon name={faCircleNotch} spin {...props} />;
};
