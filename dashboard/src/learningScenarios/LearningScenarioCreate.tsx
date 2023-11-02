import {
  AutocompleteArrayInput,
  Create,
  Labeled,
  ReferenceArrayInput,
  SimpleForm,
  TextInput,
  required,
  useGetList,
  useInput,
  useRedirect,
  useStore,
  useTranslate,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { BackButton } from "@dslab/ra-back-button";
import { Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect } from "react";

const ScenarioInput = (props: { source: string; label: string }) => {
  const translate = useTranslate();
  const { field } = useInput({
    source: props.source,
    defaultValue: false,
  });
  const fieldValue = field.value;

  const publicIcon = fieldValue ? (
    <CheckIcon sx={{ zIndex: 1, pointerEvents: "none" }} />
  ) : undefined;
  const privateIcon = fieldValue ? undefined : (
    <CheckIcon sx={{ zIndex: 1, pointerEvents: "none" }} />
  );

  return (
    <Labeled
      label="resources.learningScenarios.publicScenario"
      sx={{ rowGap: "0 !important" }}
    >
      <>
        <div style={{ padding: "5px 0 20px 0px" }}>
          <Chip
            label={translate(
              "resources.learningScenarios.publicScenarioOption.public"
            )}
            variant={fieldValue ? "filled" : "outlined"}
            onClick={() => field.onChange(true)}
            icon={publicIcon}
            sx={{
              cursor: "pointer",
              marginRight: "8px",
              height: "36px",
              borderRadius: "20px",
              border: fieldValue
                ? "1px solid rgba(0, 0, 0, 0.3)"
                : "1px solid rgba(0, 0, 0, 0.2)",
              "& .MuiChip-label": {
                fontSize: "0.95rem",
                color: fieldValue
                  ? "rgba(0, 0, 0, 0.87)"
                  : "rgba(0, 0, 0, 0.6)",
              },
              "& .MuiChip-icon": {
                fontSize: "1.25rem",
                marginLeft: "10px",
                marginRight: "-5px",
                color: "rgba(0, 0, 0, 0.87)",
              },
            }}
          />

          <Chip
            label={translate(
              "resources.learningScenarios.publicScenarioOption.private"
            )}
            variant={!fieldValue ? "filled" : "outlined"}
            onClick={() => field.onChange(false)}
            icon={privateIcon}
            sx={{
              cursor: "pointer",
              height: "36px",
              borderRadius: "20px",
              border: !fieldValue
                ? "1px solid rgba(0, 0, 0, 0.3)"
                : "1px solid rgba(0, 0, 0, 0.2)",
              "& .MuiChip-label": {
                fontSize: "0.95rem",
                color: !fieldValue
                  ? "rgba(0, 0, 0, 0.87)"
                  : "rgba(0, 0, 0, 0.6)",
              },
              "& .MuiChip-icon": {
                fontSize: "1.25rem",
                marginLeft: "10px",
                marginRight: "-5px",
                color: "rgba(0, 0, 0, 0.87)",
              },
            }}
          />
        </div>
      </>
    </Labeled>
  );
};

export const LearningScenarioCreate = () => {
  const params = useParams();
  const domainId = params.domainId;
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/scenarios/d/${domainId}`);
  };

  const { total } = useGetList("educators", {
    meta: { domainId },
  });

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({ ...data, domainId })}
      title="titlePages.learningScenarios.create"
    >
      <BackButton />
      <SimpleForm
        sx={{
          "& .MuiStack-root": {
            rowGap: "0.5rem",
          },
        }}
      >
        <TextInput
          source="title"
          validate={[required()]}
          fullWidth
          label="resources.learningScenarios.title"
        />
        <TextInput
          source="desc"
          fullWidth
          multiline={true}
          label="resources.learningScenarios.description"
        />
        <TextInput
          source="language"
          fullWidth
          label="resources.learningScenarios.language"
        />
        <ScenarioInput
          source="publicScenario"
          label="resources.learningScenarios.publicScenario"
        />
        <ReferenceArrayInput
          source="educators"
          reference="educators"
          queryOptions={{ meta: { domainId } }}
          perPage={total}
        >
          <AutocompleteArrayInput
            label="resources.learningScenarios.educators"
            fullWidth
          />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
};
