import {
  Create,
  DateInput,
  SimpleForm,
  TextInput,
  maxValue,
  minValue,
  required,
  useRedirect,
} from "react-admin";
import { useParams } from "react-router-dom";
import { BackButton } from "@dslab/ra-back-button";
import { useFormContext } from "react-hook-form";

export const ModuleCreateForm = () => {
  const { getValues, setError, clearErrors } = useFormContext();

  const fromDateValidator = (dateFrom: any) => {
    const dateTo = getValues("dateTo");

    if (dateTo && dateFrom) {
      const dateFromTime = new Date(dateFrom).getTime();
      const dateToTime = new Date(dateTo).getTime();

      if (dateFromTime > dateToTime) {
        setError("dateTo", {
          type: "manual",
          message: "resources.modules.toDateBeforeFromDate",
        });
        return "resources.modules.toDateBeforeFromDate";
      }
    }
    
    if (dateTo) clearErrors("dateTo");
    return undefined;
  };

  const toDateValidator = (dateTo: any) => {
    const dateFrom = getValues("dateFrom");

    if (dateFrom && dateTo) {
      const dateFromTime = new Date(dateFrom).getTime();
      const dateToTime = new Date(dateTo).getTime();

      if (dateFromTime > dateToTime) {
        setError("dateFrom", {
          type: "manual",
          message: "resources.modules.toDateBeforeFromDate",
        });
        return "resources.modules.toDateBeforeFromDate";
      }
    }

    if (dateFrom) clearErrors("dateFrom");
    return undefined;
  };

  return (
    <>
      <TextInput
        source="title"
        validate={[required()]}
        fullWidth
        label="resources.modules.title"
      />
      <TextInput
        source="desc"
        label="resources.modules.description"
        fullWidth
        multiline={true}
      />
      <TextInput source="level" label="resources.modules.level" fullWidth />
      <DateInput
        source="dateFrom"
        label="resources.modules.dateFrom"
        validate={fromDateValidator}
        fullWidth
      />
      <DateInput
        source="dateTo"
        label="resources.modules.dateTo"
        validate={toDateValidator}
        fullWidth
      />
    </>
  );
};

export const ModuleCreate = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const redirect = useRedirect();

  const onSuccess = () => {
    redirect(`/modules/d/${domainId}/s/${learningScenarioId}`);
  };

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({ ...data, domainId, learningScenarioId })}
      title="titlePages.modules.create"
    >
      <BackButton />
      <SimpleForm
        sx={{
          "& .MuiStack-root": {
            rowGap: "0.5rem",
          },
        }}
      >
        <ModuleCreateForm />
      </SimpleForm>
    </Create>
  );
};
