export type SendMailAttachParam = {
  filename: string;
  content: string | Buffer;
};

export type SendMailHTMLContent<T> = {
  html: string;
  params: T;
};

export type SendMailParams<T = object> = {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  content: SendMailHTMLContent<T> | string;
  attachments?: SendMailAttachParam[];
};
