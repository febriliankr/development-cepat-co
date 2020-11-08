import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/core";
import React, { ReactElement } from "react";

interface Props {}

export default function Bcrumb({}: Props): ReactElement {
  return (
    <div>
      <Breadcrumb
        spacing="8px"
        separator={<Icon color="gray.300" name="chevron-right" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/about">About</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/contact">Contact</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}
