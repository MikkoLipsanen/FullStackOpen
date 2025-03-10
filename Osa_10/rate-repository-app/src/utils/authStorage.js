import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const accessToken = await AsyncStorage.getItem(
            `${this.namespace}:tokens`,
        );
  
        return accessToken;
    }

    async setAccessToken(accessToken) {
        await AsyncStorage.setItem(
            `${this.namespace}:tokens`,
            accessToken,
        );
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(`${this.namespace}:tokens`);
  }
}

export default AuthStorage;