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
	const accountUrl = BASE_URL + '/accounts/' + ACCOUNT_ID + '?key=' + API_KEY;
	const depositsUrl = BASE_URL + '/accounts/' + ACCOUNT_ID + '/deposits?key=' + API_KEY;
	const withdrawalsUrl = BASE_URL + '/accounts/' + ACCOUNT_ID + '/withdrawals?key=' + API_KEY;

	// Called when the deposit button is pressed:
	// POST deposit HTTP request
	function onDeposit(amount) {
		httpPostTransaction(depositsUrl, amount);
	}

	// Called when the withdrawal button is pressed:
	// POST withdrawal HTTP request
	function onWithdrawal(amount) {
		if (balance >= amount)
			httpPostTransaction(withdrawalsUrl, amount);
		else
			operationFailed("Insufficient funds");
	}

	// Called when refresh button is clicked
	// and after a new deposit or withdrawal is added
	async function onGetTransactions() {

		// GET account data to retrieve name + balance
		let accountData = await httpGetTransaction(accountUrl);

		// GET deposits for account
		let deposits = await httpGetTransaction(depositsUrl);

		// GET withdrawals for account
		let withdrawals = await httpGetTransaction(withdrawalsUrl);

		// Combine deposits + withdrawals into one array and sort by date
		let transactions = deposits.concat(...withdrawals);
		transactions.sort((a, b) => compareDates(a, b));

		// Update the information displayed in our table
		setBalance(accountData.balance);
		setAccountNickname(accountData.nickname);
		setRecordListData(transactions);
	}

	// Sends POST request to CapitalOne API with the given URL and amount
	// Supports both withdrawal and deposit endpoints since the request body is the same format for both
	function httpPostTransaction(url, amount) {
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

	// Sends GET request to CapitonOne API with the given URL
	// Returns the response body
	async function httpGetTransaction(url) {
		return await axios.get(url)
			.then((response) => { return response.data; })
			.catch((err) => { operationFailed(err.message); });
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
						onDeposit={onDeposit}
						onWithdrawal={onWithdrawal}
						onGetTransactions={onGetTransactions}
					/>
				</Flex>
			</div>
		</>
	);
};
