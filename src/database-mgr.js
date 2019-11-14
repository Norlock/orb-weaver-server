import { Database } from "arangojs";
import { constants } from "constants";

export class DatabaseMgr {  
    constructor(username, password) {  
        this.db = new Database();
        this.db.useBasicAuth(username, password);
    }

    createDatabase() {  
        this.db.createDatabase(constants.dbName).then(() => {  
            this.createCollection();
        }, err => {  
            console.error('Failed to create database:', err);
        });   
    }

    createCollection() {  
        this.db.useDatabase(constants.dbName);
        const collection = this.db.collection(constants.owCollection);
        collection.create().then((result) => {  
            console.log('Collection created', result);
        }, err => {  
            console.error('Failed to create collection:', err);
        });   
    }

    listDatases() {  
        this.db.listDatabases().then(
            result => console.log('res', result),
            err => console.log('err', err)
        );
    }

    dropDatabase() {  
        this.db.dropDatabase(constants.dbName).then(() => {  
            console.log('Database deleted');
        }, err => {  
            console.log("Can't delete database", err);
        });
    }
}
