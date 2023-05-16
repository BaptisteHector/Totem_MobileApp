const login = (email, password) => {
    fetch('http://localhost:10000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
}

const pushNotificationToken = async (token) => {
    const userId = await AsyncStorage.getItem('id');
    fetch('http://localhost:10000/api/user/pushNotificationToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id : useId,
            notificationToken: token,
        }),
    });
}

export default {login}