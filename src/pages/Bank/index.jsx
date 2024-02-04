import React, { useState } from 'react';
import { Flex, message } from 'antd';

import { RecordList } from '../RecordList';
import { Operation } from '../Operation';

import { ACCOUNT_ID, API_KEY, BASE_URL } from '../../defs';

import axios from 'axios';

export const Bank = (props) => {
	const [messageApi, contextHolder] = message.useMessage();

	let [recordListData, setRecordListData] = useState([]);
	let [balance, setBalance] = useState(0);

	// Reusable GET request function
	async function httpGetRequest(url) {
		return await axios.get(url)
			.then((response) => { return response.data; })
			.catch((err) => { operationFailed(err.message); });
	}

	// Called when refresh button is clicked
	// and after a new deposit or withdrawal is added
	async function onGetTransactions() {

		// Deposit and withdrawal URLs
		const accountUrl = BASE_URL + '/accounts/' + ACCOUNT_ID + '?key=' + API_KEY;
		const depositsUrl = BASE_URL + '/accounts/' + ACCOUNT_ID + '/deposits?key=' + API_KEY;
		const withdrawalsUrl = BASE_URL + '/accounts/' + ACCOUNT_ID + '/withdrawals?key=' + API_KEY;

		// GET account data to retrieve name + balance
		let accountData = await httpGetRequest(accountUrl);

		// GET deposits for account
		let deposits = await httpGetRequest(depositsUrl);

		// GET withdrawals for account
		let withdrawals = await httpGetRequest(withdrawalsUrl);

		// Combine deposits + withdrawals into one array and sort by date
		let transactions = deposits.concat(...withdrawals);
		transactions.sort((a, b) => compareDates(a, b));

		// Update the information displayed in our table
		setRecordListData(transactions, accountData);
	}

	// Helper function for sorting transactions by date
	function compareDates(a, b) {
		return a.transaction_date < b.transaction_date ? 1 : a.transaction_date < b.transaction_date ? -1 : 0;
	}

	// Called when the deposit button is pressed
	function onDeposit(amount) {
		const url = BASE_URL + '/accounts/' + ACCOUNT_ID + '/deposits?key=' + API_KEY;
		postTransaction(url, amount);
	}

	// Called when the withdrawal button is pressed
	function onWithdrawal(amount) {
		const url = BASE_URL + '/accounts/' + ACCOUNT_ID + '/withdrawals?key=' + API_KEY;
		postTransaction(url, amount);
	}

	// Sends POST request to CapitalOne API with the given URL and amount
	// Supports both withdrawal and deposit endpoints
	function postTransaction(url, amount) {
		axios
			.post(url, {
				medium: 'balance',
				transaction_date: new Date().toLocaleString(),
				amount: amount,
			})
			.then((response) => {
				// If operation was successful, refresh table data
				operationSuccessful(response.data.message);
				onGetTransactions();
			})
			.catch((err) => {
				operationFailed(err.message);
			});
	}

	function operationSuccessful(message) {
		messageApi.open({
			type: 'success',
			content: 'Request successful: ' + message.toString(),
		});
	}

	function operationFailed(message) {
		messageApi.open({
			type: 'error',
			content: 'Request error: ' + message.toString(),
		});
	}

	return (
		<>
			{contextHolder}
			<div className="page-wrap">
				<Flex gap={40}>
					<RecordList data={recordListData} />
					<Operation
						onDeposit={onDeposit}
						onWithdrawal={onWithdrawal}
						onGetTransactions={onGetTransactions}
					/>
				</Flex>
			</div>
		</>
	);
};
