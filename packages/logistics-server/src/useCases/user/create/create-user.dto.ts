interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface ICreateUserResponseDTO {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar: string;
  updatedAt: Date;
  createdAt: Date;
  status: string;
}

export { ICreateUserRequestDTO, ICreateUserResponseDTO };
