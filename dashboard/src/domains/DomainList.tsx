import {
  List,
  Datagrid,
  TopToolbar,
  CreateButton,
  ExportButton,
  EditButton,
  ShowButton,
  TextInput,
  Button,
  useRedirect,
  useRecordContext,
  useTranslate,
  Link,
  BulkDeleteButton,
  useListContext,
} from "react-admin";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button as MuiButton,
} from "@mui/material";

const ListActions = () => (
  <TopToolbar>
    <CreateDomainButton />
    <ExportButton />
  </TopToolbar>
);

// const domainFilters = [
//     <TextInput label="resources.domains.search" source="q"  alwaysOn />]

const PostBulkActionButtons = () => {
  const translate = useTranslate();
  const listContext = useListContext();

  const selectedIdsCount = listContext.selectedIds.length;
  const resourceName = translate(
    `resources.domains.${selectedIdsCount === 1 ? "singular" : "plural"}`
  );

  const title = translate("ra.message.bulk_delete_title", {
    name: resourceName,
    smart_count: selectedIdsCount,
  });

  const content = translate("ra.message.bulk_delete_content", {
    name: resourceName,
    smart_count: selectedIdsCount,
  });

  return (
    <BulkDeleteButton
      mutationMode="pessimistic"
      confirmTitle={title}
      confirmContent={content}
    />
  );
};

export const DomainList = () => {
  const redirect = useRedirect();
  const translate = useTranslate();

  return (
    <List
      empty={<Empty />}
      actions={<ListActions />}
      title="titlePages.domains.list"
      sx={{ justifyContent: "center" }}
    >
      <Datagrid
        bulkActionButtons={<PostBulkActionButtons />}
        sx={{
          "& .RaBulkActionsToolbar-topToolbar": {
            backgroundColor: "initial",
          },
        }}
      >
        <DomainButton
          source="title"
          label="resources.domains.title"
        ></DomainButton>
        <EditDomainButton />
        <ShowDomainButton />
      </Datagrid>
    </List>
  );
};

const DomainButton = (props: { source: string; label: string }) => {
  const redirect = useRedirect();
  const record = useRecordContext();
  if (!record) return null;
  return (
    <>
      <MuiButton
        onClick={() => {
          redirect(`/domains/${record.id}`);
        }}
        sx={{
          fontFeatureSettings: "normal",
          fontKerning: "auto",
          fontOpticalSizing: "auto",
          fontSize: "13px",
          fontStretch: "100%",
          fontStyle: "normal",
          fontVariantAlternates: "normal",
          fontVariantCaps: "normal",
          fontVariantEastAsian: "normal",
          fontVariantLigatures: "normal",
          fontVariantNumeric: "normal",
          fontVariationSettings: "normal",
          fontWeight: "500",
          lineHeight: "19.5px"
        }}
      >
        {record.title}
      </MuiButton>
    </>
  );
};

const EditDomainButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const to = `/domains/${record.id}/edit`;

  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowDomainButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const to = `/domains/${record.id}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};

const CreateDomainButton = () => {
  const record = useRecordContext();
  const to = `/domains/create`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};

const Empty = () => {
  const params = useParams();
  const translate = useTranslate();
  const to = `/domains/create`;

  return (
    <Box textAlign="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.domains.empty")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.domains.addOne")}
          </Typography>

          <Box mt={3}>
            <Link to={to}>
              <MuiButton color="primary" variant="contained">
                {translate("ra.action.create")}
              </MuiButton>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
