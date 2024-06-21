import decompress from 'decompress';
import {Response} from 'express';
import fs from 'fs';
import https from 'https';

const {DATA_PATH} = process.env;

const downloadFile = (source: string, dest: string) => {
	return new Promise<boolean>((resolve, reject) => {
		const file = fs.createWriteStream(dest);
		
		https.get(source, response => {
			     if (response.statusCode === 200) {
				     response.pipe(file);
				     file.on('finish', () => {
					     file.close();
					     resolve(true);
				     });
			     } else {
				     reject(response.statusMessage);
			     }
		     })
		     .on('error', (error) => reject(error));
	});
	
};

export const downloadData = () => {
	return new Promise<string[]>((resolve, reject) => {
		if (!DATA_PATH) {
			reject('DATA_PATH not defined');
			return;
		}
		
		const source = 'https://ergast.com/downloads/f1db_csv.zip';
		const dest   = `${DATA_PATH}/f1db_csv.zip`;
		
		fs.mkdirSync(DATA_PATH, {recursive: true});
		
		downloadFile(source, dest)
			.then(() => {
				decompress(dest, DATA_PATH)
					.then((files) => {
						fs.unlink(dest, () => null);
						resolve(files.map(({path}) => path));
					})
					.catch(error => reject(error));
			})
			.catch(error => reject(error));
	});
};

export const downloadHandler = (res: Response) => {
	downloadData()
		.then(files => res.json(files))
		.catch(error => res.json({status: 'error', error}));
};