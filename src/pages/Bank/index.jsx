import React, { useEffect, useState } from 'react';
import { Flex, message, Card } from 'antd';
import { RecordList } from '../RecordList';
import { Operation } from '../Operation';

import { ACCOUNT_ID, API_KEY, BASE_URL } from '../../defs';

import axios from 'axios';

export const Bank = (props) => {

	// Refresh table on page load
	useEffect(() => { onGetTransactions() }, []);

	const [messageApi, contextHolder] = message.useMessage();

	let [balance, setBalance] = useState(0);
	let [accountNickname, setAccountNickname] = useState(0);
	let [recordListData, setRecordListData] = useState([]);

	// URLs for HTTP requests
	
	/// { TODO } ///
	const accountUrl = "";
	const depositsUrl = "";
	const withdrawalsUrl = "";

	// Sends POST request to CapitalOne API with the given URL and amount
	// Supports both withdrawals and deposits since the request body is the same format for both
	function httpPostTransaction(url, amount) {
		/// { TODO } ///
	}

	// Called when the deposit button is clicked (POST deposit HTTP request)
	function onPostDeposit(amount) {
		/// { TODO } ///
	}

	// Called when the withdrawal button is clicked (POST withdrawal HTTP request)
	function onPostWithdrawal(amount) {
		/// { TODO } ///
	}

	// Sends GET request to CapitonOne API with the given URL
	// Returns the response body
	async function httpGetTransaction(url) {
		/// { TODO } ///
	}

	// Called when refresh button is clicked and after a new deposit or withdrawal is added
	async function onGetTransactions() {
		/// { TODO } ///
	}

	// Helper function: Sort transactions by date
	function compareDates(a, b) {
		return a.transaction_date < b.transaction_date ? 1 : a.transaction_date < b.transaction_date ? -1 : 0;
	}

	// Helper function: Display success popup
	function operationSuccessful(message) {
		messageApi.open({
			type: 'success',
			content: 'Success: ' + message.toString(),
		});
	}

	// Helper function: Display error popup
	function operationFailed(message) {
		messageApi.open({
			type: 'error',
			content: 'Error: ' + message.toString(),
		});
	}

	return (
		<>
			{contextHolder}
			<div className="page-wrap">
				<Flex gap={40}>
					<Card title={accountNickname} extra={"Balance: $" + balance}>
						<RecordList data={recordListData} />
					</Card>
					<Operation
						onDeposit={onPostDeposit}
						onWithdrawal={onPostWithdrawal}
						onGetTransactions={onGetTransactions}
					/>
				</Flex>
			</div>
		</>
	);
};
