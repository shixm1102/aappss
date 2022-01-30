// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from '@polkadot/react-components/types';

import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';

import { useTranslation } from '@polkadot/apps/translate';
import { EthersProvider, Web3Provider } from '@polkadot/react-api';
import { Tabs } from '@polkadot/react-components';
import { useAccounts, useIpfs } from '@polkadot/react-hooks';

import EthereumAssets from './EthereumAssets';
import MainnetAssets from './MainnetAssets';

const HIDDEN_ACC = ['vanity'];

function BridgeApp ({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { hasAccounts } = useAccounts();
  const { isIpfs } = useIpfs();

  const itemsRef = useRef([
    {
      isRoot: true,
      name: 'bridge',
      text: t<string>('Rubik to Ethereum')
    },
    {
      name: 'bridgeBack',
      text: t<string>('Ethereum to Rubik')
    }
  ]);

  return (
    <Web3Provider>
      <EthersProvider>
        <main className='accounts--App'>
          <header>
            <Tabs
              basePath={basePath}
              hidden={(hasAccounts && !isIpfs) ? undefined : HIDDEN_ACC}
              items={itemsRef.current}
            />
          </header>
          <Switch>
            <Route path={`${basePath}/bridgeBack`}>
              <EthereumAssets />
            </Route>
            <Route basePath={basePath}
              onStatusChange={onStatusChange}>
              <MainnetAssets />
            </Route>

          </Switch>
        </main>
      </EthersProvider>

    </Web3Provider>
  );
}

export default React.memo(BridgeApp);
