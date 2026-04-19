"use server";
import { IDomainRecord } from "@/components/Views/Domain/domainRecords";

function createEmptyDomainRecord(domain: string): IDomainRecord {
  return {
    whois: {
      domain,
      created: "",
      expired: "",
      nameservers: [],
      domainStatus: [],
      admin: {
        email: "",
      },
      registrant: {
        email: "",
      },
      raw: "",
    },
    dns: {
      mxRecords: [],
      aRecords: [],
      cnameRecords: [],
    },
    summary: {
      domainLocked: undefined,
      emailHost: undefined,
      domainOwner: undefined,
    },
  };
}

export async function getDomainWHOIS(domain: string): Promise<IDomainRecord> {
  return createEmptyDomainRecord(domain.trim());
}

const domainAPI = {
  getDomainWHOIS,
};

export default domainAPI;
