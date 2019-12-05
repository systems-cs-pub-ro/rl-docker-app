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
    await likePhoto(this.props.data.id)
  }

  public render() {
    const { data } = this.props
    return (
      <div className='Image'>
        <img src={`/api/image?id=${data.id}`} alt='' onClick={() => window.open(`/api/image?id=${data.id}`,'_blank')} />
        <div className='likes' onClick={this.like}>
          <span role='img' aria-label=''>💗</span>
          {data.likesCount}
        </div>
      </div>
    );
  }
}
