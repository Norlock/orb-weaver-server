import express from 'express';
import { DatabaseMgr } from "./database-mgr";
import { CollectionMgr } from "./collection-mgr";
import { constants } from './constants';

const app = express();
const dbMgr = new DatabaseMgr("root", "openSesame");
const colMgr = new CollectionMgr(dbMgr.db);


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

function sendSuccesResponse(res, result) {  
    res.status(200).send({
        success: true,
        result: result
    });
}

function sendFailureResponse(res, message, err) {  
    console.log('error', err);
    res.status(200).send({
        success: false,
        result: message
    });
}

// get all ow-nodes
app.get('/api/ow-nodes', (req, res) => {
    colMgr.owCollection.all().then(
        promise => sendSuccesResponse(res, promise._result), 
        err => sendFailureResponse(false, "Can't retrieve collection", err)
    );
});

// get all todos
app.get('/api/ow-nodes/:key', (req, res) => {
    const key = req.params.key;

    colMgr.owCollection.document(key).then(
        doc => sendSuccesResponse(res, JSON.stringify(doc)),
        err => sendFailureResponse(res, 'Failed to fetch document', err)
    );
});

app.listen(constants.PORT, () => {
  console.log(`server running on port ${constants.PORT}`)
});
