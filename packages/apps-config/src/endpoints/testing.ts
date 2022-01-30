// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { LinkOption } from '../settings/types';

import { expandEndpoints } from './util';

/* eslint-disable sort-keys */

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @polkadot/networks)
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint

export function createTesting (t: TFunction): LinkOption[] {
  return expandEndpoints(t, [
    // alphabetical based on chain name, e.g. Amber, Arcadia, Beresheet, ...
    // {
    //   info: 'crust-rocky',
    //   text: t('rpc.crust.network', 'Crust Rocky', { ns: 'apps-config' }),
    //   providers: {
    //     'Crust Network': 'wss://rpc-rocky.crust.network'
    //   }
    // }
    {
      info: 'rubik',
      text: t('rpc.rubik.network', 'Rubik', { ns: 'apps-config' }),
      providers: {
        'Rubik Network': 'ws://101.200.164.225:9944'
      }
    }
  ]);
}
