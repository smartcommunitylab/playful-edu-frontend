import { Edit, ReferenceArrayInput, SelectInput, SimpleForm, TextInput, required, useStore } from "react-admin"
import { DOMAIN_KEY } from "../constants";

export const ComposedActivityEdit = () => {
    const [domainId] = useStore(DOMAIN_KEY);

    return (
        <Edit transform={(data: any) => ({ ...data, domainId })}>
            <SimpleForm>
            <TextInput source="title" label="resources.composedActivity.title" validate={[required()]} fullWidth />
            <SelectInput source="type" choices={[
    { id: 'singleton', name: 'Singola' },
    { id: 'set', name: 'set' },
    { id: 'list', name: 'list' },
]} />
</SimpleForm>
        </Edit>
    )
}
