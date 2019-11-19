import { DatabaseMgr } from './database-mgr.js';
import { CollectionMgr } from './collection-mgr.js';
const readline = require('readline');

const actions = {  
    INIT_DB: "1",
    DROP_DB: "2", 
    IMPORT_COLLECTION: "3",
    LIST_COLLECTION: "4",
    EXIT: "0"
};

const dbMgr = new DatabaseMgr("root", "openSesame");
const colMgr = new CollectionMgr(dbMgr.db);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function init() {  
    rl.question("Database manager tool\n1: Create database\n2: Drop database\n3: Import collection"
        + "\n4: List collection\n0: Exit program\n\n", (answer) => {  
            switch (answer) {
                case actions.INIT_DB:
                    dbMgr.createDatabase();
                    break;
                case actions.DROP_DB:
                    dbMgr.dropDatabase();
                    break;
                case actions.IMPORT_COLLECTION:
                    colMgr.importCollection();
                    break;
                case actions.LIST_COLLECTION:
                    colMgr.listCollection();
                    break;
                case actions.EXIT:
                default:
                    console.log('DatabaseMgr', dbMgr); // Close database
            }
            rl.close();
    });
}

init();
