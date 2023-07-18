import { ReferenceArrayField, Show, SimpleShowLayout, TextField } from "react-admin"

export const ComposedActivityShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
            <ReferenceArrayField label="activity" reference="activity" source="activity" />
        </SimpleShowLayout>
        </Show>
    )
}
