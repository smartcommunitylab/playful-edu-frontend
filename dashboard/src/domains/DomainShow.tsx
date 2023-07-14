import { Show, SimpleShowLayout, TextField } from "react-admin"

export const DomainShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
            <TextField source="title"  />
        </SimpleShowLayout>
        </Show>
    )
}
