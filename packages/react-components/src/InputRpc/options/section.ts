// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DropdownOptions } from '../../util/types';

import { ApiPromise } from '@polkadot/api';

export default function createOptions (api: ApiPromise): DropdownOptions {
  return Object
    .keys(api.rpc)
    .sort()
    .filter((section) => Object.keys((api.rpc as Record<string, Record<string, unknown>>)[section]).length !== 0)
    .map((name): { text: string; value: string } => {
      const showtext = name.replaceAll('Member', 'Miner').replaceAll('member', 'miner').replaceAll('Validator', 'Guardian').replaceAll('validator', 'guardian');

      return {
        text: showtext,
        value: name
      };
    });
}
