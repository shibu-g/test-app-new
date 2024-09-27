
import {Page, Layout, LegacyCard} from '@shopify/polaris';
import React from 'react';

const Dashboard = () => {
    return (
        <Page fullWidth>
          <Layout>
            <Layout.Section>
              <LegacyCard title="Online store dashboard" sectioned>
                <p>View a summary of your online store’s performance.</p>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        </Page>
      );
}

export default Dashboard

