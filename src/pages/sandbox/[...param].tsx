import React, { useEffect } from 'react';
import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { SandboxPageContent } from '@sandbox/components/page-content';
import { Goals, useFathomGoal } from '@common/hooks/use-fathom';
import { SafeSuspense } from '@components/ssr-safe-suspense';
import { withInitialQueries } from 'jotai-query-toolkit/nextjs';
import { pageAtomBuilders } from '@common/page-queries/extra-initial-values';
import { getHomePageQueries } from '@common/page-queries/home';
import { useNetworkToast } from '@common/hooks/use-network-toast';
import { NetworkModeToast } from '@components/network-mode-toast';

const Sandbox: NextPage<SandboxData> = props => {
  useNetworkToast();
  const { handleTrackGoal } = useFathomGoal();

  useEffect(() => {
    handleTrackGoal(Goals.SANDBOX_LOAD);
  }, []);

  return (
    <SafeSuspense fallback={<></>}>
      <Head>
        <title>Sandbox - Stacks 2.0 explorer</title>
      </Head>
      <SandboxPageContent {...props} />
      <NetworkModeToast />
    </SafeSuspense>
  );
};

Sandbox.getInitialProps = (ctx: NextPageContext): SandboxData => {
  const { query } = ctx;
  const param = query?.param ? query.param : [];
  let view = 'deploy';

  // only allow one of the available views
  if (['contract-call', 'transfer', 'faucet', 'deploy'].indexOf(param[0]) >= 0) {
    view = param[0];
  }

  const sender = param[1] || '';
  const contract = param[2] || '';

  return { view, sender, contract };
};

export interface SandboxData {
  view: string;
  sender: string;
  contract: string;
}

export default withInitialQueries(Sandbox, pageAtomBuilders)(getHomePageQueries);
