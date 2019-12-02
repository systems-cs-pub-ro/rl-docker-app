/* -------------------------------------------------------------------------- */
/*                                  🎩 Header                                 */
/* -------------------------------------------------------------------------- */

import './index.scss'
import * as React from 'react';
import logo from './RL_Logo.png'
import { Button } from '../Button';

export interface IHeaderProps {
}

export default class Header extends React.Component<IHeaderProps> {

  inputRef: HTMLInputElement | null = null
  submitRef: HTMLInputElement | null = null

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
        <h1>Relestagram</h1>
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
