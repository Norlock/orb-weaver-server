import { DatabaseMgr } from './database-mgr.js';
const readline = require('readline');

const actions = {  
    INIT_DB: "1",
    DROP_DB: "2", // TODO
    CREATE_COLLECTION: "3",
    IMPORT_COLLECTION: "4",
    LIST_COLLECTION: "5",
    EXIT: "0"
};

const dbMgr = new DatabaseMgr("root", "openSesame");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function init() {  
    rl.question("Database manager tool\n1: Initialise database\n2: Drop database\n"
        + "3: Create collection\n4: Import collection\n5: List collection\n0: Exit program\n\n", (answer) => {  
            switch (answer) {
                case actions.INIT_DB:
                    dbMgr.createDatabase();
                    break;
                case actions.DROP_DB:
                    dbMgr.dropDatabase();
                    break;
                case actions.CREATE_COLLECTION:
                    dbMgr.createCollection();
                    break;
                case actions.IMPORT_COLLECTION:
                    dbMgr.importCollection();
                    break;
                case actions.LIST_COLLECTION:
                    dbMgr.listCollection();
                    break;
                case actions.EXIT:
                default:
                    console.log('DatabaseMgr', dbMgr); // Close database
            }
            rl.close();
    });
}

init();
