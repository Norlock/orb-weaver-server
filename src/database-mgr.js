import { Database } from "arangojs";
import { constants } from "./constants.js";

/**
 * Class to manage database on an easy way. Create / delete / or show stored
 * collections
 **/
export class DatabaseMgr {  
    constructor(username, password) {  
        this.db = new Database();
        this.db.useBasicAuth(username, password);
        this.db.useDatabase(constants.DB_NAME);
    }

    createDatabase() {  
        this.db.createDatabase(constants.DB_NAME).then(() => {  
            this.createCollection();
        }, err => {  
            console.error('Failed to create database:', err);
        });   
    }

    createCollection() {  
        const collection = this.db.collection(constants.OW_COLLECTION);
        collection.create().then(
            result => console.log('Collection created', result), 
            err => console.error('Failed to create collection:', err)
        );   
    }

    listDatases() {  
        this.db.listDatabases().then(
            result => console.log('res', result),
            err => console.log('err', err)
        );
    }

    dropDatabase() {  
        this.db.dropDatabase(constants.DB_NAME).then(() => {  
            console.log('Database deleted');
        }, err => {  
            console.log("Can't delete database", err);
        });
    }
}
