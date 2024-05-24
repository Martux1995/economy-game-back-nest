export type SendMailAttachParam = {
  filename: string;
  content: string | Buffer;
};

export type SendMailHTMLContent = {
  html?: string;
  text?: string;
};

export type SendMailParams = {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  content: SendMailHTMLContent;
  attachments?: SendMailAttachParam[];
};
