import { ReferenceArrayField, Show, SimpleShowLayout, TextField } from "react-admin"

export const FragmentShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
            <TextField source="title"  />
            <ReferenceArrayField label="ComposedActivity" reference="composedActivity" source="composedActivity" />
        </SimpleShowLayout>
        </Show>
    )
}
