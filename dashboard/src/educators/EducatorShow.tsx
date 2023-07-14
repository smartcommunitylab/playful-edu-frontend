import { Show, SimpleShowLayout, TextField } from "react-admin"

export const EducatorShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
            <TextField source="firstname"  />
            <TextField source="lastName" />
            <TextField source="email" />
        </SimpleShowLayout>
        </Show>
    )
}
