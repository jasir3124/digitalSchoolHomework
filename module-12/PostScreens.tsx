import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { Component } from 'react';
import { useNavigation } from "expo-router";

interface State {
    posts: { id: number; title: string; body: string }[];
}

export default class PostScreens extends Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            posts: []
        };
    }

    async componentDidMount() {
        try {
            const data = await fetch('https://jsonplaceholder.typicode.com/posts');
            const jsonData = await data.json();
            this.setState({ posts: jsonData.slice(0, 10) });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    render() {
        const { posts } = this.state;
        return (
            <ScrollView>
                <Text style={styles.screenHeader}>PostScreens</Text>
                {posts.map(post => (
                    <View key={post.id} style={styles.cardContainer}>
                        <Text style={styles.postTitle}>{post.title}</Text>
                        <Text>{post.body}</Text>
                    </View>
                ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    screenHeader: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20,
    },
    cardContainer: {
        margin: 20,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
    },
    postTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        paddingBottom: 10
    }
});
