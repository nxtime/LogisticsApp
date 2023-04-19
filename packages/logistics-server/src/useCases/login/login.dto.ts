interface LoginResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
  },
  token: string;
}

export { LoginResponseDTO };
