// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react/index';
import Popup from 'reactjs-popup';

import { Icon } from '@polkadot/react-components';

const HEIMTooltip: React.FC = () => {
  const createIndex = (index: number) => <span style={{ fontSize: 8, verticalAlign: 'text-top' }}> {index}</span>;
  const createRow = (idx: number, txt: string, desc: string) => <span style={{ whiteSpace: 'nowrap' }}>{`1.0 ${txt} = 1.0 ${desc}  = 1x10`}{createIndex(idx)}{' HEIM'} </span>;

  return <Popup
    className='my-popup dib-l'
    closeOnDocumentClick
    on={['hover', 'focus']}
    position={['top center']}
    trigger={<span>&nbsp;&nbsp;<Icon icon='question-circle' /></span>}
  >
    <>
      {createRow(-12, 'pHEIM', 'pico HEIM')}
      <br/>
      {createRow(-9, 'nHEIM', 'nano HEIM')}
      <br/>
      {createRow(-6, 'µHEIM', 'micro HEIM')}
      <br/>
      {createRow(-3, 'mHEIM', 'milli HEIM')}
      <br/>
    </>

  </Popup>;
};

export default HEIMTooltip;
