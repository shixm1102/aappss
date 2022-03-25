// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ConstantCodec } from '@polkadot/metadata/decorate/types';
import type { DropdownOption, DropdownOptions } from '../../util/types';

import React from 'react';

import { ApiPromise } from '@polkadot/api';

export default function createOptions (api: ApiPromise, sectionName: string): DropdownOptions {
  const section = api.consts[sectionName];

  if (!section || Object.keys(section).length === 0) {
    return [];
  }

  return Object
    .keys(section)
    .sort()
    .map((value): DropdownOption => {
      const method = (section[value] as ConstantCodec);

      const showtext = value.replaceAll('Member', 'Miner').replaceAll('member', 'miner').replaceAll('Validator', 'Guardian').replaceAll('validator', 'guardian');
      const type = method.meta.type.toString();
      const typetext = type.replaceAll('Member', 'Miner').replaceAll('member', 'miner').replaceAll('Validator', 'Guardian').replaceAll('validator', 'guardian');
      const doc = (method.meta.documentation[0] || method.meta.name).toString();
      const doctext = doc.replaceAll('Member', 'Miner').replaceAll('member', 'miner').replaceAll('Validator', 'Guardian').replaceAll('validator', 'guardian');

      return {
        className: 'ui--DropdownLinked-Item',
        key: `${sectionName}_${value}`,
        text: [
          <div
            className='ui--DropdownLinked-Item-call'
            key={`${sectionName}_${value}:call`}
          >
            {showtext}: {typetext}
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
