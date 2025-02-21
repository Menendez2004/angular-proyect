// src/app/mocks/user.mock.ts

export const mockUser = {
    id: '1',
    username: 'testuser',
    email: 'testuser@example.com',
    token: 'fake-jwt-token'
};

export class MockAuthService {
    currentUser = mockUser;

    login(username: string, password: string) {
        return Promise.resolve(this.currentUser);
    }

    logout() {
        this.currentUser = mockUser;
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    getUser() {
        return this.currentUser;
    }
}