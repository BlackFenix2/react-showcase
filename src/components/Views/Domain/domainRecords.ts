export type WhoisResponse = {
  response: IDomainRecord;
  domain: string;
  loading: boolean;
  error: boolean;
  errorMessage: string;
};

export interface IWhoisRecord {
  domain: string;
  created: string;
  expired: string;
  nameservers: string[];
  domainStatus: string[];
  admin: {
    email: string;
  };
  registrant: {
    email: string;
  };
  raw: string;
}

export interface IDnsRecord {
  mxRecords: string[];
  aRecords: string[];
  cnameRecords: string[];
}

export interface IDomainRecord {
  whois: IWhoisRecord;
  dns: IDnsRecord;
  summary: IDomainSummary;
}

export interface IDomainSummary {
  domainLocked: boolean | undefined;
  emailHost: string | undefined;
  domainOwner: string | undefined;
}
