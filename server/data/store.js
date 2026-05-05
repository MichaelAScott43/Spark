export const store = {
  users: [],
  conversations: [],
  analyses: []
};

export const byUser = (arr, userId) => arr.filter((item) => item.userId === userId);
