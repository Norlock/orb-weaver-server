import {constants} from './constants';

export class CollectionMgr {  
    constructor(db) {  
        this.db = db;
        this.db.useDatabase(constants.dbName);
        this.collection = this.db.collection(constants.owCollection);
    }

    importCollection() {  
        const baseUrl = 'http://localhost';
        const nodes = [];

        const banNode = {  
            _key: 'blutausnord',
            name: 'Blut Aus Nord',
            image: baseUrl + '/images/blutausnord.jpg',
            related: [
                'deathspellomega',
                'drudkh'
            ]
        };

        const belakorNode = {  
            _key: 'belakor',
            name: "Be'lakor",
            image: baseUrl + '/images/belakor.jpg',
            related: [
                'insomnium',
                'persefone'
            ]
        };

        const gojiraNode = {  
            _key: 'gojira',
            name: "Gojira",
            image: baseUrl + '/images/gojira-dark.jpg',
            related: [
                'insomnium',
                'persefone'
            ]
        };

        const deathspellOmegaNode = {  
            _key: 'deathspellomega',
            name: "Deathspell Omega",
            image: baseUrl + '/images/deathspellomega.jpg',
            related: [
                'blutausnord',
                'drudkh'
            ]
        };

        nodes.push(banNode);
        nodes.push(belakorNode);
        nodes.push(deathspellOmegaNode);
        nodes.push(gojiraNode);

        this.collection.import(nodes, { overwrite: true }).then(
            result => console.log('Import complete', result),
            err => console.error('Import failed:', err)
        ); 
    }

    listCollection() {  
        this.collection.all().then(
            result => console.log('res', result),
            err => console.log('err', err)
        );
    }

    getKey(name) {  
        return name.replace(/[^A-Z0-9]/ig, "");
    }
}
