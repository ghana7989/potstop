// for next.js's <head> tag and rendering images
import Head from 'next/head';
import Image from 'next/image';

// import the web3 library with setup from lib/web3.js
import {web3} from '../lib/web3';

// import react hooks
import {useState, useEffect} from 'react';

// all from our components folder
import Account from '../components/Account';
import EthName from '../components/EthName';
import Answer from '../components/Answer';
import AnswerForm from '../components/AnswerForm';

export default function Home() {
	// todo:
	// 1. make the connect button work!
	// 2. get the answers from the API (see /api/answers.js file)
	// 3. add tipping like project 1
	// 4. make the user name look good
	// 5. let the user post their own reply

	const [accounts, setAccounts] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [answers, setAnswers] = useState([]);

	const connect = async () => {
		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts',
		});

		if (!accounts || accounts.length === 0) return;
		setAccounts(accounts);
	};

	useEffect(() => {
		if (accounts.length) {
			setIsLoggedIn(true);
			return;
		}
		setIsLoggedIn(false);
	}, [accounts]);

	useEffect(() => {
		(async function () {
			const accounts = await window.ethereum.request({
				method: 'eth_accounts',
			});
			setAccounts(accounts);
		})();
		window.ethereum.on('accountsChanged', accounts => {
			setAccounts(accounts);
		});
		fetch('/api/answers')
			.then(res => res.json())
			.then(data => {
				setAnswers(data.answers);
				setIsLoading(false);
			});
	}, []);
	return (
		<main>
			<header>
				<h1>HitMe</h1>

				<form>
					<input type='text' placeholder='Search' />
				</form>

				<Account
					connect={connect}
					isLoggedIn={isLoggedIn}
					account={accounts[0]}
				/>
			</header>

			<section className='question'>
				<div className='main'>
					<h3>Feedback forum</h3>
					<h2>Looking for feedback as a beginner</h2>
					<p>
						Hey everyone, I&apos;m a Software Developer, with just 11 months
						professional experience into my journey, and I&apos;m looking to get
						some feedback on what I&apos;ve made so far. I was learning
						fullstack from past 2 years. Blockchain is a field that interested
						me and it is just 1 week into blockchain that I am building this.
						Please take time and give your feedback.
					</p>

					<div className='slides'>
						<Image src='/image-1.jpg' width='600' height='800' alt='pots' />
						<Image src='/image-2.jpg' width='600' height='800' alt='pots' />
						<Image src='/image-3.jpg' width='600' height='800' alt='pots' />
						<Image src='/image-4.jpg' width='600' height='800' alt='pots' />
					</div>
				</div>
				<div className='meta'>
					{/* EthName */}
					<div className='eth-name'>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src='https://ipfs.io/ipfs/QmbctVN8tPaDLiLysVDwThf7JTJhMejbSypZ4a3v5H2G3a'
							alt='Avatar of riklomas.eth'
						/>
						<div className='name'>
							<span className='primary'>0xb25bf3...aaf4</span>
						</div>
					</div>
					{/* end EthName */}
				</div>
			</section>

			<section className='answers'>
				{isLoading ? (
					<div className='loading'>Loading answers...</div>
				) : (
					answers.map((answer, index) => {
						return (
							<Answer
								key={index}
								accounts={accounts}
								answer={answer}
								isLoggedIn={isLoggedIn}
								number={index}
							/>
						);
					})
				)}
			</section>

			<Head>
				<title>
					Looking for feedback as a beginner – Feedback forum – HitMe
				</title>
				<meta
					property='og:title'
					content='Looking for feedback as a beginner on HitMe'
				/>
				<meta property='og:image' content='/social.png' />
			</Head>
		</main>
	);
}
