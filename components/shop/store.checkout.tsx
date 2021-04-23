import Container from "@material-ui/core/Container";
import React from "react";
import { ISettings } from "../../lib/data-access";
import { PageLayout } from "../app/layout";
import { CheckoutWizard } from "./checkout-wizard/checkout-wizard";

export type ICheckoutProps = {
  settings: ISettings;
};

export const Checkout = (props: ICheckoutProps) => {
  const { settings } = props;

  return (
    <PageLayout
      pageTitle={[settings.band.name, "Store", "Checkout"]}
      settings={settings}
      hideFooter
    >
      <Container maxWidth="sm">
        <CheckoutWizard />
      </Container>
    </PageLayout>
  );
};