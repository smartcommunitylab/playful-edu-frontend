import { Create, SelectInput, SimpleForm, TextInput, required } from "react-admin"
import { useSearchParams } from "react-router-dom";
import { DOMAIN_URL_PARAM } from "../constants";

export const ComposedActivityCreate = () => {
    const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
    return (
        <Create redirect="list" transform={(data: any) => ({ ...data, domainId })}>
        <SimpleForm>
            <TextInput source="title" label="resources.composedActivity.title" validate={[required()]} fullWidth />
            <SelectInput source="type" choices={[
    { id: 'singleton', name: 'Singola' },
    { id: 'set', name: 'set' },
    { id: 'list', name: 'list' },
]} />
        </SimpleForm>
    </Create>
    )
}