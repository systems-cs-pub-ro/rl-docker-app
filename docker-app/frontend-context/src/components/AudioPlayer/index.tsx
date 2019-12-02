/* -------------------------------------------------------------------------- */
/*                              🔉 Rușine player                              */
/* -------------------------------------------------------------------------- */

import * as React from 'react';

export interface IAudioPlayerState {
  on: boolean
}

export default class AudioPlayer extends React.Component<{}, IAudioPlayerState> {
  state: IAudioPlayerState = {
    on: false
  }

  componentDidMount() {
    document.addEventListener('keypress', this.onKeyPress)
  }

  onKeyPress = (e: KeyboardEvent) => {
    console.log(e.key)
    if (e.key === 'f' || e.key === 'F') {
      this.setState({ on: true })
      setTimeout(
        () => this.setState({ on: false }), 13000
      )
    }
  }

  public render() {
    if (!this.state.on) {
      return null
    }

    return (
      <audio src='/rusine.mp3' autoPlay />
    );
  }
}
