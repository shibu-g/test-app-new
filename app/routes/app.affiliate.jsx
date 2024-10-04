import React, { useState, useCallback, useMemo } from "react";
import {
  Page,
  Layout,
  Card,
  DataTable,
  Button,
  Pagination,
  Modal,
  TextContainer,
  AppProvider,
  TextField,
} from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return {
    affiliates: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        joinDate: "2023-01-15",
        generatedLink: "https://example.com/ref/john",
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
        generatedLink: "https://example.com/ref/jane",
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
        generatedLink: "https://example.com/ref/bob",
        linksGenerated: 80,
        clicks: 1000,
        conversions: 50,
        revenue: 2000,
      },
    ],
  };
};

export default function AffiliatesPage() {
  const { affiliates } = useLoaderData();
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleAffiliateClick = useCallback((affiliate) => {
    setSelectedAffiliate(affiliate);
    setModalActive(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalActive(false);
    setSelectedAffiliate(null);
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
  }, []);

  const filteredAffiliates = useMemo(() => {
    return affiliates.filter(
      (affiliate) =>
        affiliate.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        affiliate.email.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [affiliates, searchValue]);

  const rows = filteredAffiliates.map((affiliate) => [
    affiliate.name,
    affiliate.email,
    affiliate.joinDate,
    affiliate.generatedLink,
    affiliate.linksGenerated,
    affiliate.clicks,
    affiliate.conversions,
    `$${affiliate.revenue.toFixed(2)}`,
    <div style={{ padding: "0 10px" }}>
      <Button onClick={() => handleAffiliateClick(affiliate)}>
        View Details
      </Button>
    </div>,
  ]);

  return (
    <AppProvider i18n={{}}>
      <Page fullWidth title="Affiliate Management">
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextField
                label="Search affiliates"
                value={searchValue}
                onChange={handleSearchChange}
                clearButton
                onClearButtonClick={() => setSearchValue("")}
                placeholder="Search by name or email"
              />
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <div style={{ overflowX: "auto", width: "100%" }}>
                <DataTable
                  columnContentTypes={[
                    "text",
                    "text",
                    "text",
                    "text",
                    "numeric",
                    "numeric",
                    "numeric",
                    "numeric",
                    "text",
                  ]}
                  headings={[
                    "Name",
                    "Email",
                    "Join Date",
                    "Generated Link",
                    "Links Generated",
                    "Clicks",
                    "Conversions",
                    "Revenue",
                    "Actions",
                  ]}
                  rows={rows}
                  footerContent={`Showing ${filteredAffiliates.length} of ${affiliates.length} affiliates`}
                  stickyHeader
                />
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Pagination
              hasPrevious
              onPrevious={() => {
                console.log("Previous");
              }}
              hasNext
              onNext={() => {
                console.log("Next");
              }}
            />
          </Layout.Section>
        </Layout>
        {selectedAffiliate && (
          <Modal
            open={modalActive}
            onClose={handleModalClose}
            title={`${selectedAffiliate.name}'s Details`}
            primaryAction={{
              content: "Close",
              onAction: handleModalClose,
            }}
          >
            <Modal.Section>
              <TextContainer>
                <p>Email: {selectedAffiliate.email}</p>
                <p>Join Date: {selectedAffiliate.joinDate}</p>
                <p>Generated Link: {selectedAffiliate.generatedLink}</p>
                <p>Links Generated: {selectedAffiliate.linksGenerated}</p>
                <p>Clicks: {selectedAffiliate.clicks}</p>
                <p>Conversions: {selectedAffiliate.conversions}</p>
                <p>Revenue: ${selectedAffiliate.revenue.toFixed(2)}</p>
              </TextContainer>
            </Modal.Section>
          </Modal>
        )}
      </Page>
    </AppProvider>
  );
}
