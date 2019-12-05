/* -------------------------------------------------------------------------- */
/*                                  🎩 Header                                 */
/* -------------------------------------------------------------------------- */

import './index.scss'
import * as React from 'react';
import logo from './RL_Logo.png'
import { Button } from '../Button';
import {getBackendNode} from '../../services'

export interface IHeaderProps {
}

export interface IHeaderState {
    nodeId: string
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {

  state: IHeaderState = {
    nodeId: 'N/A'
  }

  inputRef: HTMLInputElement | null = null
  submitRef: HTMLInputElement | null = null

  componentDidMount = async () => {
    const {backendNode} = await getBackendNode()
    this.setState({nodeId: backendNode}) 
  }

  triggerFileInput = () => {
    if (this.inputRef === null) {
      return
    }

    this.inputRef.click()
  }

  triggerUpload = () => {
    if (this.submitRef === null) {
      return
    }

    this.submitRef.click()
  }

  public render() {
    return (
      <header>
        <img src={logo} alt='' />
        <Button onClick={this.triggerFileInput}>
          <span aria-label='up' role='img'>🔼</span>
          Adaugă valoare
          <span aria-label='up' role='img'>🔼</span>
        </Button>
        <div className='text'>
          <h1>Relestagram</h1>
          <h2>Node: {this.state.nodeId}</h2>
        </div>
        <form
          action="/api/upload/image"
          method="POST"
          encType="multipart/form-data"
          target='bla'
        >
          <input type="file" name="name" ref={ref => this.inputRef = ref} onChange={this.triggerUpload} />
          <input type="submit" ref={ref => this.submitRef = ref} />
        </form>
        <iframe title='bla' id='bla' name='bla' />
      </header>
    );
  }
}
