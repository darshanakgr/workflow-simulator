# Workflow Simulator

A clould service and a npm module is to monitor the state changes of chained task in real-time. It also provides an interface to connect with the cloud service which is hosted on http://workflow-simulator.herokuapp.com/.

<blockquote>
    An account created on our cloud service will be required to perform the following tasks.
</blockquote>

## Installing

WorkflowSimulator runs on Node.js and is available as an NPM package. You can install WorkflowSimulator in your project's directory as usual:

```
npm install --save workflow-simulator
```

## Usage

### Initializing the connection

First, you need to initialize an object of WSClient in order to establish a connection with the cloud service. You should have permission to initialize the connection. 

```js
const { WSClient } = require("workflow-simulator");

const client = new WSClient({
    host: "-- url to cloud service --",
    secretKey: "-- secret key --",
    groupId: "-- identifier of the task group --"
});
```

### Listening to events

You can listen to events such as connect and disconnect using the initialized client.

```js
// connect
client.on("connect", function() {
    // triggered when the connection is established with the cloud service
});

// disconnect
client.on("disconnect", function() {
    // triggered when the connection is closed with the cloud service
});
```

### Add a listener 

You can listen to the state changes, errors, and messages which is related to the chained task mentioned when initializing the WSClient.

```js
client.addListener((error, message) => {
    if (error) {
        return console.log(error);
    }
    console.log(message);
}, (err) => {
    console.log(err);
    client.close();
});
```

### Create a subroutine in the chained task

Subroutines or tasks can be add to the chained task using the initialized client as follows.

```js
client.createTask({
    taskId: "T009",
    groupId: "G001",
    name: "Test",
    description: "Test",
    progress: 0,
    predecessors: ["T003"]
}, (err, res) => {
    if(err){
        return console.log(err);
    }
    console.log(res);
});
```

### update the progress of a task or a subroutine

The state changes occurred when the progress of a task or a subroutine is updated. You also notify the all clients when a state is changed.

```js
client.updateProgress({
    taskId: "T002",
    groupId: "G001",
    progress: 10
}, (err, res) => {
    if(err){
        return console.log(err);
    }
    console.log(res);
});
```

### Notify an error 

When a subroutine is executed, errors may occur and it is requires to notify all the client about the error.

```js
client.notifyError({
    timestamp: new Date().getTime(),
    groupId: "G001",
    name: "Info",
    message: "Test Message"
}, (err, res) => {
    if(err){
        return console.log(err);
    }
    console.log(res);
});
```

### Get all the tasks or subroutines

You can get the details of all the task in the chained tasks as follows.

```js
client.getAllTasks((err, res) => {
    if(err){
        return console.log(err);
    }
    console.log(res);
});
```

### Advanced guides and docs

You can refer the API on /* url */ for more details







