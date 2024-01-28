import TableAndD, { TableProps } from 'antd/es/table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <RecordType extends object = any>({ ...props }: TableProps<RecordType>) => {
  return <TableAndD {...props} />;
};

export default Table;
