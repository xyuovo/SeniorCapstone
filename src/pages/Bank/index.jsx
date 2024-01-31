import React, { useState } from 'react';
import { Flex, message } from 'antd';

import { RecordList } from '../RecordList';
import { Operation } from '../Operation';

export const Bank = (props) => {
  const [messageApi, contextHolder] = message.useMessage();

  let [ recoredListData, setRecoredListData] = useState([]);
  let [ balance, setBalance] = useState(0);

  function onDeposit(params) {
    setBalance(balance += params)
    const newRecord = {
      key: (recoredListData.length + 1).toString(), account: 'account', operation: 'deposit', amount: params.toString(), balance: balance, time: new Date().toLocaleString()
    }
    setRecoredListData([...recoredListData, newRecord])
    successOperartion()
  }

  function onWithdrawal(params) {
    if (params > balance) {
      messageApi.open({
        type: 'error',
        content: 'not sufficient funds!',
      });
      return
    }
    setBalance(balance -= params)
    const newRecord = {
      key: (recoredListData.length + 1).toString(), account: 'account', operation: 'withdrawal', amount: params.toString(), balance: balance, time: new Date().toLocaleString()
    }
    setRecoredListData([...recoredListData, newRecord])
    successOperartion()
  }

  function successOperartion() {
    messageApi.open({
      type: 'success',
      content: 'operate successfully',
    });
  }

  return(
    <>
      {contextHolder}
      <div className='page-wrap'>
        <Flex gap={40}>
          <RecordList data={recoredListData} />
          <Operation
            onDeposit={onDeposit}
            onWithdrawal={onWithdrawal}
          />
        </Flex>
      </div>
    </>
  )
}