import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
	const [working, setWorking] = useState(false);
	const maxAttempts = 2;
	const testInternet = async (attempt = 1) => {
		const url = "https://stackoverflow.com/";
		fetch(url)
			.then((response) => {
				if (response.status === 200) {
					setWorking(true);
				}
			})
			.catch((error) => {
				console.error(error);
				setWorking(false);
				if (attempt < maxAttempts) {
					testInternet(attempt + 1);
				}
			});
	};
	useEffect(() => {
		testInternet();
	}, []);
	return (
		<View style={styles.container}>
			<Text>{working ? "Working" : "Not Working"}</Text>
			<Button title="Test" onPress={() => testInternet()} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
