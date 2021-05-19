interface IData {
  to: string;
  subject: string;
  variables: any;
  path: string;
}

interface IMailProvider {
  sendMail(data: IData): Promise<void>;
}

export { IMailProvider };
