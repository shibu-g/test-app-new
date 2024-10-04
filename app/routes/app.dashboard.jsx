import React from "react";
import {
  Page,
  Layout,
  Card,
  TextContainer,
  Text,
  ProgressBar,
  DataTable,
  Button,
  AppProvider,
} from "@shopify/polaris";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  // This is a placeholder for your actual data fetching logic
  return {
    linkStats: [
      ["Today", "50", "100"],
      ["This week", "300", "650"],
      ["This month", "1,200", "2,500"],
    ],
    topAffiliates: [
      ["1", "John Doe", "120", "$2,400"],
      ["2", "Jane Smith", "95", "$1,900"],
      ["3", "Bob Johnson", "80", "$1,600"],
    ],
  };
};

export default function Dashboard() {
  const { linkStats, topAffiliates } = useLoaderData();

  return (
    <AppProvider i18n={{}}>
      <Page fullWidth title="Affiliate Dashboard">
        <Layout>
          <Layout.Section oneHalf>
            <Card sectioned>
              <TextContainer spacing="tight">
                <Text variant="headingMd" as="h2">
                  Welcome back, Affiliate Manager!
                </Text>
                <Text color="subdued">
                  Here's an overview of your affiliate program performance.
                </Text>
              </TextContainer>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card sectioned title="Quick Actions">
              <Layout>
                <Layout.Section oneThird>
                  <Link to={"https://www.my12twelve.com/affiliate"}>
                    <Button fullWidth>Generate New Link</Button>
                  </Link>
                </Layout.Section>
                <Layout.Section oneThird>
                  <Link to={"/app/affiliate"}>
                    <Button fullWidth>View All Affiliates</Button>
                  </Link>
                </Layout.Section>
                <Layout.Section oneThird>
                  <Link to={"/app/reports"}>
                    <Button fullWidth>Payout Report</Button>
                  </Link>
                </Layout.Section>
              </Layout>
            </Card>
          </Layout.Section>
          <Layout.Section oneThird>
            <Card sectioned title="Link Generation Stats">
              <DataTable
                columnContentTypes={["text", "numeric", "numeric"]}
                headings={["Period", "Users", "Links Generated"]}
                rows={linkStats}
              />
            </Card>
          </Layout.Section>
          <Layout.Section oneThird>
            <Card sectioned title="Total Affiliates">
              <TextContainer spacing="tight">
                <Text variant="headingLg" as="h3">
                  256
                </Text>
                <Text color="success">+15% from last month</Text>
              </TextContainer>
              <div style={{ marginTop: "1rem" }}>
                <ProgressBar progress={75} size="small" />
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section oneThird>
            <Card sectioned title="Conversion Rate">
              <TextContainer spacing="tight">
                <Text variant="headingLg" as="h3">
                  3.2%
                </Text>
                <Text color="warning">-0.5% from last month</Text>
              </TextContainer>
              <div style={{ marginTop: "1rem" }}>
                <ProgressBar progress={60} size="small" />
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned title="Top Performing Affiliates">
              <DataTable
                columnContentTypes={["text", "text", "numeric", "numeric"]}
                headings={["Rank", "Affiliate", "Links Generated", "Revenue"]}
                rows={topAffiliates}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}
