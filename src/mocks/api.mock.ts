import { mockAuthTokens, mockUser } from '@mocks/user.mock';

export const signInMock = async () => {
  return {
    user: mockUser,
    ...mockAuthTokens,
  };
};
