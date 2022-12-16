import {Avatar} from '@mui/material';
import {useEffect, useState} from 'react';
import wikipedia from 'wikipedia';
import {APIResponse} from '../api/Ergast';

type DriverImageProps = {
	driver: APIResponse['Driver'];
}

export default function DriverAvatar({driver}: DriverImageProps) {
	const {givenName, familyName} = driver;
	const name                    = `${givenName} ${familyName}`;
	
	const [imgSrc, setImgSrc] = useState<string>();
	
	useEffect(() => {
		wikipedia.page(name)
		         .then(page => page.summary())
		         .then(pageInfo => setImgSrc(pageInfo.thumbnail.source));
	}, [setImgSrc]);
	
	return <Avatar variant="square" alt="" src={imgSrc} sx={{width: 24, height: 24}}/>;
}