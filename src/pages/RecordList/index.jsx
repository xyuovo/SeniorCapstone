
import { Table, Tag } from 'antd';

export const RecordList = (props) => {
  const columns = [
    {
      title: 'Users account',
      dataIndex: 'account'
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: operation => (
        <Tag color={operation === 'deposit' ? 'blue' : 'yellow'} key={operation}>{operation}</Tag>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: amount => (
        <span>$ {amount}</span>
      )
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      render: amount => (
        <span>$ {amount}</span>
      )
    },
    {
      title: 'Time',
      dataIndex: 'time'
    }
  ];
  return(
    <>
      <div className='table-wrap'>
        <Table columns={columns} dataSource={props.data} />
      </div>
    </>
  )
}