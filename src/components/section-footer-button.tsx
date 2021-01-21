import React from 'react';
import NextLink from 'next/link';

import { Grid, color } from '@stacks/ui';
import { Caption } from '@components/typography';

import { border } from '@common/utils';

interface SectionFooterButtonPropsBase {
  isLoading?: boolean;
  hasNextPage?: boolean;
  onClick?: () => void;
  path?: 'blocks' | 'transactions';
  showLoadMoreButton?: boolean;
}

export const SectionFooterAction: React.FC<SectionFooterButtonPropsBase> = ({
  onClick,
  isLoading,
  path,
  hasNextPage,
  showLoadMoreButton,
}) =>
  onClick && showLoadMoreButton ? (
    hasNextPage ? (
      <Grid
        as="a"
        borderTop={border()}
        px="base"
        py="base"
        placeItems="center"
        _hover={{ color: color('text-title'), cursor: 'pointer' }}
        onClick={onClick}
        color={color('text-caption')}
      >
        <Caption color="currentColor">{isLoading ? 'Loading...' : `Load more ${path}`}</Caption>
      </Grid>
    ) : null
  ) : (
    <NextLink href={`/${path}`} passHref>
      <Grid
        as="a"
        borderTop={border()}
        px="base"
        py="base"
        placeItems="center"
        _hover={{ color: color('text-title') }}
        onClick={onClick}
        color={color('text-caption')}
      >
        <Caption color="currentColor">View all {path}</Caption>
      </Grid>
    </NextLink>
  );