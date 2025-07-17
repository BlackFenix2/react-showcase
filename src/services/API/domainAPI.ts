"use server";
import { WhoisResponse } from "@/components/Views/Domain/domainRecords";
import { apiRequest, methods } from "../API/apiRoot";
import * as whoiser from "whoiser";
import whois from "whois";

export const getDomainWHOIS = async (domain: string) => {
  const test = await whois.lookup("google.com");
  console.log(test);

  const result: WhoisResponse = {
    response: {
      whois: {
        domain: "",
        created: "",
        expired: "",
        nameservers: [""],
        domainStatus: [""],
        admin: {
          email: "",
        },
        registrant: {
          email: "",
        },
        raw: "",
      },
      dns: {
        mxRecords: [""],
        aRecords: [""],
        cnameRecords: [""],
      },
      summary: {
        domainLocked: undefined,
        emailHost: undefined,
        domainOwner: undefined,
      },
    },
    domain: "",
    loading: false,
    error: false,
    errorMessage: "",
  };
  return result;
};
