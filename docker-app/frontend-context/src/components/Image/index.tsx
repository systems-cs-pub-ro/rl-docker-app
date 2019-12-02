/* -------------------------------------------------------------------------- */
/*                             📷 Image component                             */
/* -------------------------------------------------------------------------- */

import './index.scss'
import * as React from 'react';
import { Image } from '../../services/types';
import { likePhoto } from '../../services';

export interface IImageElementProps {
  data: Image
}

export default class ImageElement extends React.Component<IImageElementProps> {
  like = async () => {
    await likePhoto(this.props.data.name)
  }

  public render() {
    const { data } = this.props
    return (
      <div className='Image' onClick={this.like}>
        <img src={`/api/image?id=${data.id}`} alt='' />
        <div className='likes'>
          <span role='img' aria-label=''>💗</span>
          {data.likesCount}
        </div>
      </div>
    );
  }
}
