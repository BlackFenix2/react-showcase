"use client";
import React from "react";
import { domainAPI } from "@/services/API";
import Debug from "@/components/Views/Domain/Debug";
import DnsInfo from "@/components/Views/Domain/DnsInfo";
import DomainCard from "@/components/Views/Domain/DomainCard";
import { IDomainRecord, WhoisResponse } from "@/components/Views/Domain/domainRecords";
import InputForm from "@/components/Views/Domain/InputForm";
import Legal from "@/components/Views/Domain/Legal";
import SummaryInfo from "@/components/Views/Domain/SummaryInfo";
import WhoisInfo from "@/components/Views/Domain/WhoisInfo";
import { Grid, Card, CardContent, Box, CardHeader } from "@mui/material";
import { getDomainWHOIS } from "@/services/API/domainAPI";

const initialState: WhoisResponse = {
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

export default function Page() {
  const [state, setState] = React.useState<WhoisResponse>(initialState);

  const getDomain = async (domain: string) => {
    // set the loading state
    setState((prevState) => ({ ...prevState, loading: true }));

    // make the API Calls
    getDomainWHOIS(domain)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          response,
          loading: false,
        }));
      })
      .catch((error: any) => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: true,
          errorMessage: error.message,
        }));
      });

    // output the API Response
  };
  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      domain: event.target.value,
    }));
  };

  const handleSubmit = () => {
    reset();
    getDomain(state.domain);
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ sm: 3 }}>
          <InputForm handleSubmit={handleSubmit} domain={state.domain} change={change} loading={state.loading} />
        </Grid>
        <Grid size={{ sm: 3 }}>
          <Card raised>
            <CardHeader title="Domain Name" />
            <CardContent>
              <p>{state.response.whois.domain}</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid size={{ sm: 3 }}>
          <DomainCard name="WHOIS" loading={state.loading}>
            <WhoisInfo whois={state.response.whois} />
          </DomainCard>
        </Grid>
        <Grid size={{ sm: 3 }}>
          <DomainCard name="DNS" loading={state.loading}>
            <DnsInfo dns={state.response.dns} />
          </DomainCard>
        </Grid>
        <Grid size={{ sm: 3 }}>
          <DomainCard name="Summary" loading={state.loading}>
            <SummaryInfo domainSummary={state.response.summary} />
          </DomainCard>
        </Grid>
        <Grid size={{ sm: 3 }}>
          <DomainCard name="Debug" loading={state.loading}>
            <Debug loading={state.loading} error={state.error} errorMessage={state.errorMessage} />
          </DomainCard>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid size={{ sm: 12 }}>
          <DomainCard name="Raw WHOIS" loading={state.loading}>
            {state.response.whois.raw
              .replace("\r", "")
              .split("\n")
              .map((i, k) => (
                <p key={k}>{i}</p>
              ))}
          </DomainCard>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid size={{ sm: 12 }}>
          <Legal />
        </Grid>
      </Grid>
    </Box>
  );
}
