// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DropdownOption, DropdownOptions } from '../../util/types';

import React from 'react';

import { ApiPromise } from '@polkadot/api';

export default function createOptions(api: ApiPromise, sectionName: string): DropdownOptions {
  const section = api.tx[sectionName];

  if (!section || Object.keys(section).length === 0) {
    return [];
  }

  return Object
    .keys(section)
    .sort()
    .map((value): DropdownOption => {
      const method = section[value];
      const inputs = method.meta.args
        .filter((arg): boolean => arg.type.toString() !== 'Origin')
        .map((arg): string => arg.name.toString())
        .join(', ');

      const showtext = value.replaceAll('Member', 'Miner').replaceAll('member', 'miner').replaceAll('Validator', 'Guardian').replaceAll('validator', 'guardian');
      const inputstext = inputs.replaceAll('Member', 'Miner').replaceAll('member', 'miner').replaceAll('Validator', 'Guardian').replaceAll('validator', 'guardian');
      const doc = (method.meta.documentation[0] || showtext).toString();
      const doctext = doc.replaceAll('Member', 'Miner').replaceAll('member', 'miner').replaceAll('Validator', 'Guardian').replaceAll('validator', 'guardian');

      return {
        className: 'ui--DropdownLinked-Item',
        key: `${sectionName}_${value}`,
        text: [
          <div
            className='ui--DropdownLinked-Item-call'
            key={`${sectionName}_${value}:call`}
          >
            {showtext}({inputstext})
          </div>,
          <div
            className='ui--DropdownLinked-Item-text'
            key={`${sectionName}_${value}:text`}
          >
            {doctext}
          </div>
        ],
        value
      };
    });
}
