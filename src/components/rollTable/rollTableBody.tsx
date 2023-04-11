import { FC, useEffect, useMemo, useRef, useState } from 'react';
import './index.less';
import { Column, RollTableSingle } from '@/components/rollTable/index';

const RollTableBody: FC<{
  columns: Column[];
  tableData: RollTableSingle[];
}> = ({ columns, tableData }) => {
  const bodyRef = useRef<null | HTMLDivElement>(null);
  const contentRef = useRef<null | HTMLDivElement>(null);
  function createLine(data: RollTableSingle) {
    return columns.map(({ key, width }, idx) => (
      <span className={'column'} style={{ flex: width }} key={key + idx}>
        {data[key] ?? ''}
      </span>
    ));
  }
  function createTable(data: RollTableSingle[]) {
    return data.map((item, idx) => {
      return (
        <div className={`rollTableLine bodyRow text-${item.lineState ?? 0}`} key={idx}>
          {createLine(item)}
          {
            <span
              className={'sign icon iconfont icon-dot'}
              key={'dot' + idx}
            ></span>
          }
        </div>
      );
    });
  }

  const tableEl = useMemo<JSX.Element[]>(
    () => createTable(tableData),
    [tableData],
  );

  useEffect(() => {
    // setTableEl(createTable(tableData));
    scrollTable();
  }, [tableData]);

  const [openRoll, setOpenRoll] = useState(false);
  const [isHover, setIsHover] = useState(false);
  function scrollTable() {
    const bodyHeight = bodyRef.current?.clientHeight ?? 0;
    const contentHeight = contentRef.current?.clientHeight ?? 0;
    setOpenRoll(contentHeight > bodyHeight && tableData.length > 0);
  }
  return (
    <div ref={bodyRef} className={'rollTableBody'}>
      <div
        ref={contentRef}
        className={'bodyContent'}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          animationPlayState: openRoll && !isHover ? 'running' : 'paused',
          animationDuration: tableEl.length + 's',
        }}
      >
        {tableEl}
        {openRoll ? tableEl : ''}
      </div>
    </div>
  );
};

export default RollTableBody;
