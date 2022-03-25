// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DefinitionRpcExt } from '@polkadot/types/types';
import type { DropdownOption, DropdownOptions } from '../../util/types';

import React from 'react';

import { ApiPromise } from '@polkadot/api';

export default function createOptions(api: ApiPromise, rpcs: Record<string, Record<string, DefinitionRpcExt>>, sectionName: string): DropdownOptions {
  const section = rpcs[sectionName];

  if (!section || Object.keys((api.rpc as Record<string, Record<string, unknown>>)[sectionName]).length === 0) {
    return [];
  }

  return Object
    .keys((api.rpc as Record<string, Record<string, unknown>>)[sectionName])
    .sort()
    .map((methodName) => section[methodName])
    .filter((ext): ext is DefinitionRpcExt => !!ext)
    .filter(({ isSubscription }) => !isSubscription)
    .map(({ description, method, params }): DropdownOption => {
      const inputs = params.map(({ name }) => name).join(', ');

      const methodtext = method.replaceAll('Member', 'Miner').replaceAll('member', 'miner').replaceAll('Validator', 'Guardian').replaceAll('validator', 'guardian');
      const inputstext = inputs.replaceAll('Member', 'Miner').replaceAll('member', 'miner').replaceAll('Validator', 'Guardian').replaceAll('validator', 'guardian');
      const desc = description || method;
      const doctext = desc.replaceAll('Member', 'Miner').replaceAll('member', 'miner').replaceAll('Validator', 'Guardian').replaceAll('validator', 'guardian');

      return {
        className: 'ui--DropdownLinked-Item',
        key: `${sectionName}_${method}`,
        text: [
          <div
            className='ui--DropdownLinked-Item-call'
            key={`${sectionName}_${method}:call`}
          >
            {methodtext}({inputstext})
          </div>,
          <div
            className='ui--DropdownLinked-Item-text'
            key={`${sectionName}_${method}:text`}
          >
            {doctext}
          </div>
        ],
        value: method
      };
    });
}
