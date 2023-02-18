import { IconLookup, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { MouseEventHandler } from 'react';

export interface IconProps {
  name: IconLookup;
  color?: string;
  className?: string;
  size?: SizeProp;
  spin?: boolean;
  pulse?: boolean;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

/**
 * Component for rendering icons. It uses font size for sizing.
 * Use https://fontawesome.com/search?o=r&m=free to find the name of the "name" prop.
 */
export const Icon = ({ name, className, ...rest }: IconProps) => {
  const classes = classNames(className);

  return <FontAwesomeIcon icon={name} className={classes} {...rest} />;
};
