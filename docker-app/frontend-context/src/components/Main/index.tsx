/* -------------------------------------------------------------------------- */
/*                             🏠 Main app router                             */
/* -------------------------------------------------------------------------- */

import './index.scss'
import * as React from 'react';
import Header from '../Header';
import { PacmanLoader } from 'react-spinners';
import AudioPlayer from '../AudioPlayer';
import ImageElement from '../Image';
import { getImages } from '../../services';
import { Image } from '../../services/types';



export interface IMainState {
  images: Image[]
}

export default class Main extends React.Component<{}, IMainState> {
  state: IMainState = {
    images: []
  }

  componentDidMount() {
    setInterval(this.getData, 2000)
  }

  getData = async () => {
    const images = await getImages()
    this.setState({ images })
  }

  get loader() {
    return <div className='loader'>
      <PacmanLoader color='#999' />
      <h1>BRB mănânc dușmanii...</h1>
    </div>
  }

  get images() {
    return <div className='imagesList'>
      {
        this.state.images.map(
          image => <ImageElement data={image} key={image.id} />
        )
      }
    </div>
  }

  get content() {
    if (this.state.images.length === 0) {
      return this.loader
    } else {
      return this.images
    }
  }

  public render() {
    return (
      <>
        <AudioPlayer />
        <section>
          <Header />
          {this.content}
        </section>
      </>
    );
  }
}
