import React from 'react';

import { rhythm } from '../utils/typography';

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
        }}
      >
        <div style={{ float: 'right' }}>
          <a
            href="http://nextcloud.sepiropht.appboxes.co/index.php/s/DBWT8SbYbN6kfSx"
            target="_blank"
            rel="noopener noreferrer"
          >
            resume
          </a>
        </div>
        <a
          href="https://twitter.com/sepiropht"
          target="_blank"
          rel="noopener noreferrer"
        >
          twitter
        </a>{' '}
        &bull;{' '}
        <a
          href="https://github.com/sepiropht"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>{' '}
        &bull;{' '}
        <a
          href="https://stackoverflow.com/users/5018923/william"
          target="_blank"
          rel="noopener noreferrer"
        >
          stack overflow
        </a>
      </footer>
    );
  }
}

export default Footer;
