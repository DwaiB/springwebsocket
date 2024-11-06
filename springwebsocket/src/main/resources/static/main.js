const stompClient = new StompJs.Client({
	brokerURL: 'ws://localhost:8080/websocket_app'
});

stompClient.onConnect = (frame) => {
	setConnected(true);
	console.log('Connected ' + frame);
	stompClient.subscribe('/topic/greetings', (greeting) => {
		showGreeting(JSON.parse(greeting.body).name);
	});
};
	
stompClient.onWebSocketError = (error) => {
	cosole.error('Error with Websocket' + error);
};

stompClient.onStompError = (frame) => {
	console.log('Broker reported Error: '+ frame.headers['message']);
	console.log('Additional Details: ' + frame.body);
};

function setConnected(connected){
	$("#connect").prop("disabled",connected);
	$("#disconnect").prop("disabled",!connected);
	if(connected){
		$("#container").show();
	}else{
		
	}
	$("#greets").html("");
}

function connect(){
	stompClient.activate();
	console.log("Connected");
}

function disconnect(){
	stompClient.deactivate();
	setConnected(false);
	console.log("Disconnected");
}

function sendName(){
	stompClient.publish({
		destination : "/app/hello",
		body : JSON.stringify({'name': $("#name").val()})
	});
}

function showGreeting(message){
	$("#greets").append("<tr><td>"+message+"</td></tr>");
}

$(function(){
	$("form").on('submit',(e) => e.preventDefault());
	$("#connect").click(() => connect());
	$("#disconnect").click(() => disconnect());
	$("#send").click(()=> sendName());
});