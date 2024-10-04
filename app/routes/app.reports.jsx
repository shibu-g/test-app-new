import React, { useState } from "react";
import {
  Page,
  Layout,
  Card,
  DataTable,
  Button,
  TextContainer,
  Text,
  ProgressBar,
  ButtonGroup,
  AppProvider,
} from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  // This is a placeholder for your actual data fetching logic
  return {
    summary: {
      totalAffiliates: 150,
      totalRevenue: 50000,
      totalClicks: 25000,
      totalConversions: 1000,
    },
    affiliates: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        joinDate: "2023-01-15",
        linksGenerated: 120,
        clicks: 1500,
        conversions: 75,
        revenue: 3000,
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        joinDate: "2023-02-20",
        linksGenerated: 95,
        clicks: 1200,
        conversions: 60,
        revenue: 2400,
      },
      {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        joinDate: "2023-03-10",
        linksGenerated: 80,
        clicks: 1000,
        conversions: 50,
        revenue: 2000,
      },
    ],
  };
};

export default function ReportsPage() {
  const { summary, affiliates } = useLoaderData();
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // In a real application, you would fetch new data based on the selected period
  };

  const handleDownloadPDF = () => {
    // In a real application, this function would generate and download a PDF
    console.log("Downloading PDF...");
  };

  const rows = affiliates.map((affiliate) => [
    affiliate.name,
    affiliate.email,
    affiliate.joinDate,
    affiliate.linksGenerated,
    affiliate.clicks,
    affiliate.conversions,
    `$${affiliate.revenue.toFixed(2)}`,
  ]);

  return (
    <AppProvider i18n={{}}>
      <Page
        fullWidth
        title="Affiliate Program Reports"
        primaryAction={{
          content: "Download PDF Report",
          onAction: handleDownloadPDF,
        }}
      >
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <ButtonGroup segmented>
                <Button
                  pressed={selectedPeriod === "week"}
                  onClick={() => handlePeriodChange("week")}
                >
                  This Week
                </Button>
                <Button
                  pressed={selectedPeriod === "month"}
                  onClick={() => handlePeriodChange("month")}
                >
                  This Month
                </Button>
                <Button
                  pressed={selectedPeriod === "year"}
                  onClick={() => handlePeriodChange("year")}
                >
                  This Year
                </Button>
              </ButtonGroup>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card sectioned title="Total Affiliates">
              <TextContainer spacing="tight">
                <Text variant="headingLg" as="h3">
                  {summary.totalAffiliates}
                </Text>
                <Text color="success">+15% from last {selectedPeriod}</Text>
              </TextContainer>
              <div style={{ marginTop: "1rem" }}>
                <ProgressBar progress={75} size="small" />
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card sectioned title="Total Revenue">
              <TextContainer spacing="tight">
                <Text variant="headingLg" as="h3">
                  ${summary.totalRevenue.toLocaleString()}
                </Text>
                <Text color="success">+23% from last {selectedPeriod}</Text>
              </TextContainer>
              <div style={{ marginTop: "1rem" }}>
                <ProgressBar progress={85} size="small" />
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card sectioned title="Total Clicks">
              <TextContainer spacing="tight">
                <Text variant="headingLg" as="h3">
                  {summary.totalClicks.toLocaleString()}
                </Text>
                <Text color="warning">-5% from last {selectedPeriod}</Text>
              </TextContainer>
              <div style={{ marginTop: "1rem" }}>
                <ProgressBar progress={60} size="small" />
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card sectioned title="Total Conversions">
              <TextContainer spacing="tight">
                <Text variant="headingLg" as="h3">
                  {summary.totalConversions.toLocaleString()}
                </Text>
                <Text color="success">+10% from last {selectedPeriod}</Text>
              </TextContainer>
              <div style={{ marginTop: "1rem" }}>
                <ProgressBar progress={70} size="small" />
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <div style={{ padding: "16px", overflowX: "auto" }}>
                <DataTable
                  columnContentTypes={[
                    "text",
                    "text",
                    "text",
                    "numeric",
                    "numeric",
                    "numeric",
                    "numeric",
                  ]}
                  headings={[
                    "Name",
                    "Email",
                    "Join Date",
                    "Links Generated",
                    "Clicks",
                    "Conversions",
                    "Revenue",
                  ]}
                  rows={rows}
                  footerContent={`Showing ${affiliates.length} of ${summary.totalAffiliates} affiliates`}
                />
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}
