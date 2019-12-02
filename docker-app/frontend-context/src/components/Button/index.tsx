/* -------------------------------------------------------------------------- */
/*                                  🔼 Button                                 */
/* -------------------------------------------------------------------------- */

import './index.scss'
import * as React from 'react';

export type IButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
}

export function Button(props: IButtonProps) {
  return (
    <button {...props} className='Button' />
  );
}
