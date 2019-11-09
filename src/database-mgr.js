import { Database } from "arangojs";
const owCollection = "ow_collection", dbName = "orb_weaver_db";

export class DatabaseMgr {  
    constructor(username, password) {  
        this.db = new Database();
        this.db.useBasicAuth(username, password);
    }

    createDatabase() {  
        this.db.createDatabase(dbName).then(() => {  
            this.createCollection();
        }, err => {  
            console.error('Failed to create database:', err);
        });   
    }

    createCollection() {  
        this.db.useDatabase(dbName);
        this.collection = this.db.collection(owCollection);
        this.collection.create().then((result) => {  
            console.log('Collection created', result);
        }, err => {  
            console.error('Failed to create collection:', err);
        });   

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

        this.db.useDatabase(dbName);
        this.collection = this.db.collection(owCollection);
        this.collection.import(nodes, { overwrite: true }).then(
            result => console.log('Import complete', result),
            err => console.error('Import failed:', err)
        ); 
    }

    listCollection() {  
        this.db.useDatabase(dbName);
        this.collection = this.db.collection(owCollection);

        console.log(this.collection);
        this.collection.all().then(
            result => console.log('res', result),
            err => console.log('err', err)
        );
    }

    listDatases() {  
        this.db.listDatabases().then(
            result => console.log('res', result),
            err => console.log('err', err)
        );
    }

    dropDatabase() {  
        this.db.dropDatabase(dbName).then(() => {  
            console.log('Database deleted');
        }, err => {  
            console.log("Can't delete database", err);
        });
    }

    getKey(name) {  
        return name.replace(/[^A-Z0-9]/ig, "");
    }
}
