
import { Table, Tag } from 'antd';

export const RecordList = (props) => {
  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      render: type => (
        <Tag color={type === 'deposit' ? 'blue' : 'yellow'} key={type}>{type}</Tag>
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
      title: 'Status',
      dataIndex: 'status',
      render: status => (
        <Tag color={status === 'executed' ? 'green' : status === 'pending' ? 'yellow' : 'red'} key={status}>{status}</Tag>
      )
    },
    {
      title: 'Transaction date',
      dataIndex: 'transaction_date'
    }
  ];

  return (
    <>
      <div className='table-wrap'>
        <Table columns={columns} dataSource={props.data} />
      </div>
    </>
  )
}