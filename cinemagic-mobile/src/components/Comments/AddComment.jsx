import React, { useContext, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { SessionContext } from '../../Providers/SessionProvider';
import ErrorText from 'components/UI/ErrorText';
import MainButton from 'components/UI/MainButton';
import BaseInput from 'components/UI/BaseInput';
import usePost from 'hooks/usePost';


const AddComment = ({ movieId, refetch }) => {
    const {  userId } = useContext(SessionContext);
    const [text, setText] = useState('');

    const { isPending, error, responseData, sendRequest } = usePost();

    const handleSubmit = () => {
        sendRequest(`/Comment`, 'POST', { text, userId, movieId }).then((res) => {
            setText('');
            refetch();
        });
    };

    if (error) {
        return (
            <ErrorText error={error} />
        );
    }
    if (isPending) {
        return <ActivityIndicator size="large" color="#00ff00" />
    }

    return (
        <View style={styles.container}>
            <BaseInput
                value={text}
                onChangeText={setText}
                placeholder="Add your comment"
                multiline

            />
            <View style={styles.buttonContainer}>
                <MainButton title={'Comment'} onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#212529',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    }
});

export default AddComment;
