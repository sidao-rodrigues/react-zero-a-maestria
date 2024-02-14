import { Table as TableAndD, TableProps } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <RecordType extends object = any>({ ...props }: TableProps<RecordType>) => {
  return <TableAndD {...props} />;
};

export default Table;
