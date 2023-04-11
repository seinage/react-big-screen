import { FC, useState } from 'react';
import '@/components/rollTable/index.less';
import { Column } from '@/components/rollTable/index';

const RollTableHeader: FC<{ columns: Column[] }> = (props) => {
  return (
    <div className={'rollTableLine headerRow'}>
      {props.columns.map(({ name, width, key }) => (
        <div className={'column'} style={{ flex: width }} key={key}>
          {name}
        </div>
      ))}
    </div>
  );
};

export default RollTableHeader;
