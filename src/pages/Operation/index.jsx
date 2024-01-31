import React, { useState } from 'react';
import { Flex, InputNumber, Button } from 'antd';

export const Operation = (props) => {

  let [ depositAmount, onDepositAmountChange] = useState(100);
  function onSubmitDeposit() {
    props.onDeposit(depositAmount)
  }
  
  let [ withdrawalAmount, onWithdrawalAmountChange] = useState(100);
  function onSubmitWithdrawal() {
    props.onWithdrawal(withdrawalAmount)
  }

  return(
    <>
      <div className='operation-wrap'>
        <Flex className='operation-item' vertical gap={10}>
          <div>Make a deposit</div>
          <InputNumber
            className='input-number'
            defaultValue={depositAmount}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={onDepositAmountChange}
          />
          <Button type="primary" onClick={onSubmitDeposit}>Submit</Button>
        </Flex>

        <Flex vertical gap={10}>
          <div>Make a withdrawal</div>
          <InputNumber
            className='input-number'
            defaultValue={withdrawalAmount}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={onWithdrawalAmountChange}
          />
          <Button type="primary" onClick={onSubmitWithdrawal}>Submit</Button>
        </Flex>
      </div>
    </>
  )
}