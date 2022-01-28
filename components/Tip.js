import {web3} from '../lib/web3';
import {useState, useEffect} from 'react';

const Tip = function ({isLoggedIn, accounts, address}) {
	const send = function () {
		if (!isLoggedIn) return;
		const amount = web3.utils.toWei('0.01', 'ether');
		const data = {
			from: accounts[0],
			to: address,
			value: amount,
		};
		web3.eth.sendTransaction(data, (err, hash) => {
			if (err) {
				return;
			}
		});
	};

	if (parseInt(accounts[0]) === parseInt(address)) {
		return null;
	}

	return (
		<button onClick={send} disabled={!isLoggedIn}>
			Tip 0.01 ETH
		</button>
	);
};

export default Tip;
