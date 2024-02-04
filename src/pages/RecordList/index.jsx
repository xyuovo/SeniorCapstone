
import { Table, Tag, Card } from 'antd';

export const RecordList = (props, account) => {
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

  return(
    <>
      <div className='table-wrap'>
      <Card width={1000} title={"Name: "+ account.nickname} extra={"Balance: $"+account.balance}>
        <Table columns={columns} dataSource={props.data} />
        </Card>
      </div>
    </>
  )
}