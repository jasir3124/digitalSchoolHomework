import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

type User = {
    id: number;
    name: string;
    email: string;
};

const UsersScreen: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setUsers(data.slice(0, 10)))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const renderItem = ({ item }: { item: User }) => (
        <View style={[styles.userBox, item.id === 3 && styles.thirdBox]}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList data={users} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    userBox: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 3,
    },
    thirdBox: {
        alignSelf: "flex-end",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    email: {
        fontSize: 14,
        color: "gray",
    },
});

export default UsersScreen;
