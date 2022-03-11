// Importing modules
import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

// usetstate for storing and retrieving wallet details
const [address, setAddress] = useState("");
const [balance,setBalance] = useState("");

//! Button handler button for handling a request event for metamask
const btnhandler = () => {

	// Asking if metamask is already present or not
	if (window.ethereum) {

	// res[0] for fetching a first wallet
	window.ethereum
		.request({ method: "eth_requestAccounts" })
		.then((res) => accountChangeHandler(res[0]));
	} else {
	alert("install metamask extension!!");
	}
};

//! getbalance function for getting a balance in a right format with help of ethers
const getbalance = (address) => {

	// Requesting balance method
	window.ethereum
	.request({
		method: "eth_getBalance",
		params: [address, "latest"]
	})
	.then((balance) => {
		// Setting balance
		setBalance(
		ethers.utils.formatEther(balance)
		);
	});
};

// Function for getting handling all events
const accountChangeHandler = (account) => {
	// Setting an address data
	setAddress(
	 account
	);

	// Setting a balance
	getbalance(account);
};

return (
	<div className="App">
	{/* Calling all values which we
	have stored in usestate */}

	<Card className="text-center">
		<Card.Header>
		<strong>Address: </strong>
		{address}
		</Card.Header>
		<Card.Body>
		<Card.Text>
			<strong>Balance: </strong>
			{balance}
		</Card.Text>
		<Button onClick={btnhandler} variant="danger">
			Connect to wallet
		</Button>
		</Card.Body>
	</Card>
	</div>
);
}

export default App;
