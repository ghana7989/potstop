import {useState, useEffect} from 'react';
import {web3} from '../lib/web3';
import Jazzicon, {jsNumberForAddress} from 'react-jazzicon';
import ENS, {getEnsAddress} from '@ensdomains/ensjs';
import Image from 'next/image';

const ens = new ENS({
	provider: web3.currentProvider,
	ensAddress: getEnsAddress('1'), // mainnet
});

const EnsName = function ({address}) {
	const [name, setName] = useState();
	const [avatar, setAvatar] = useState('');

	useEffect(() => {
		(async function () {
			try {
				const n = await ens.getName(address);
				if (n.name) {
					setName(n.name);
				}
			} catch (e) {}
		})();
	}, [address]);

	useEffect(() => {
		if (name) {
			(async function () {
				const a = await ens.name(name).getText('avatar');
				if (a) {
					setAvatar(a);
				}
			})();
		}
	}, [name]);

	const formattedAddress =
		address.substr(0, 6) + '...' + address.substr(address.length - 4);
	return (
		<div className='eth-name'>
			<div className='icon'>
				{avatar ? (
					<Image src={avatar} alt='profile' />
				) : (
					<Jazzicon diameter={32} seed={jsNumberForAddress(address)} />
				)}
			</div>

			<div className='name'>
				<span className='primary'>{name ? name : formattedAddress}</span>
				<span className='secondary'>{name && formattedAddress}</span>
			</div>
		</div>
	);
};

export default EnsName;
