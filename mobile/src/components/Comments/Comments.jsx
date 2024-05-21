import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Comments = ({ comments, totalItems }) => {
    const formatDate = (timestamp) => {
        
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) +
            ' at ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
     
        return formattedDate;
    };

    return (
        <ScrollView style={styles.container}>  
                 
            {comments && (
                <View>
                    <Text style={styles.header}>Comments ({totalItems})</Text>
                    {comments.map((comment) => (
                        <View key={comment.id} style={styles.comment}>
                            <View style={styles.commentHeader}>
                                <Text style={styles.boldText}>{comment.username}</Text>
                                <Text>{formatDate(comment.timestamp)}</Text>
                            </View>
                            <Text>{comment.text}</Text>
                        </View>
                    ))}                   
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    comment: {
        marginBottom: 12,
        padding: 8,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    boldText: {
        fontWeight: 'bold',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    }
});

export default Comments;
