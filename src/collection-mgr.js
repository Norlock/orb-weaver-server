import {constants} from './constants';

export class CollectionMgr {  
    constructor(db) {  
        this.db = db;
        this.db.useDatabase(constants.DB_NAME);
        this.owCollection = this.db.collection(constants.OW_COLLECTION);
    }

    importCollection() {  
        const baseUrl = 'http://localhost';
        const nodes = [];

        nodes.push({  
            _key: 'blutausnord',
            name: 'Blut Aus Nord',
            image: baseUrl + '/images/blutausnord.jpg',
            genre: constants.genre.BLACK_METALs
        });

        nodes.push({  
            _key: 'urfaust',
            name: "Urfaust",
            image: baseUrl + '/images/urfaust.jpg',
            previous: 'blutausnord',
            genre: constants.genre.BLACK_METAL
        });

        nodes.push({  
            _key: 'mgla',
            name: "Mgla",
            image: baseUrl + '/images/mgla.jpg',
            previous: 'urfaust',
            genre: constants.genre.BLACK_METAL

        });

        nodes.push({  
            _key: 'esoteric',
            name: "Esoteric",
            image: baseUrl + '/images/esoteric.jpg',
            previous: 'urfaust',
            genre: constants.genre.FUNERAL_DOOM
        });

        nodes.push({  
            _key: 'ruinsofbeverast',
            name: "Ruins of Beverast",
            image: baseUrl + '/images/mgla.jpg',
            previous: 'esoteric',
            genre: constants.genre.BLACK_METAL
        });

        nodes.push({  
            _key: 'belakor',
            name: "Be'lakor",
            image: baseUrl + '/images/belakor.jpg',
            previous: 'blutausnord',
            genre: constants.genre.MELODIC_DEATH_METAL
        });

        nodes.push({  
            _key: 'gojira',
            name: "Gojira",
            image: baseUrl + '/images/gojira-dark.jpg',
            previous: 'blutausnord',
            genre: constants.genre.DEATH_METAL
        });

        nodes.push({  
            _key: 'deathspellomega',
            name: "Deathspell Omega",
            image: baseUrl + '/images/deathspellomega.jpg',
            previous: 'blutausnord',
            genre: constants.genre.BLACK_METAL
        });

        this.owCollection.import(nodes, { overwrite: true }).then(
            result => console.log('Import complete', result),
            err => console.error('Import failed:', err)
        ); 
    }

    listCollection() {  
        this.owCollection.all().then(
            result => console.log('res', result._result),
            err => console.log('err', err)
        );
    }

    getKey(name) {  
        return name.replace(/[^A-Z0-9]/ig, "");
    }
}
